"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MessageSquare, Search, User, Bell, PhoneCall } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Pusher from "pusher-js";
import {
  getAdminChatSessions,
  getChatHistory,
  adminSendMessage,
  updateAdminStatus,
  markMessagesAsRead,
} from "@/components/features/chatbot/actions";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Types for a chat session and message
type ChatSession = {
  id: string;
  name: string;
  email: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  status: "active" | "waiting" | "inactive";
};

type Message = {
  id: string;
  userId: string;
  role: "USER" | "ADMIN" | "BOT";
  content: string;
  createdAt: Date;
  read: boolean;
  senderName: string | null;
};

// Canned responses for quick replies
const CANNED_RESPONSES = [
  "Hello! How can I help you today?",
  "Thank you for your patience. I'll look into this right away.",
  "Is there anything else you'd like assistance with?",
  "I understand your concern. Let me help resolve this for you.",
  "Could you please provide more details about your issue?",
];

export default function AdminChatDashboard() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [adminStatus, setAdminStatus] = useState<"ONLINE" | "AWAY" | "OFFLINE">(
    "ONLINE"
  );
  const [filter, setFilter] = useState<"all" | "waiting" | "active">("all");
  const [isTyping, setIsTyping] = useState(false);
  const pusherClient = useRef<Pusher | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get admin info from session
  const { data } = useSession();
  const adminId = data?.user.id;
  const adminName = data?.user.name || "Support Agent";

  // Initialize Pusher
  useEffect(() => {
    const pusherKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;
    if (!pusherClient.current && pusherKey && pusherCluster) {
      pusherClient.current = new Pusher(pusherKey, {
        cluster: pusherCluster,
      });
      console.log("Admin Pusher client initialized");
    }

    // Listen for global events
    const globalChannel = pusherClient.current?.subscribe(
      "admin-notifications"
    );
    globalChannel?.bind(
      "new-chat-request",
      (data: { sessionId: string; name: string }) => {
        toast("New Chat Request", {
          description: `${data.name} is requesting to chat with you`,
          duration: 5000,
        });

        // Auto-refresh sessions to show the new request
        loadChatSessions();
      }
    );

    return () => {
      pusherClient.current?.disconnect();
      pusherClient.current = null;
    };
  });

  // Load chat sessions from the server
  const loadChatSessions = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getAdminChatSessions();
      if (result.success && result.sessions) {
        setSessions(result.sessions);
      }
    } catch (error) {
      console.error("Error loading chat sessions:", error);
      toast.error("Failed to load chat sessions");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChatSessions();
    const intervalId = setInterval(loadChatSessions, 30000);
    return () => clearInterval(intervalId);
  }, [loadChatSessions]);

  // Subscribe to Pusher channels for each session
  useEffect(() => {
    if (!pusherClient.current) return;

    // Unsubscribe from all previous channels
    const channels = pusherClient.current.channels.channels;
    for (const channelName in channels) {
      if (channelName.startsWith("chat-")) {
        pusherClient.current.unsubscribe(channelName);
      }
    }

    // Subscribe to new channels
    sessions.forEach((session) => {
      const channel = pusherClient.current!.subscribe(`chat-${session.id}`);

      // Listen for new messages
      channel.bind(
        "new-message",
        (message: Message & { createdAt: string }) => {
          // Convert createdAt to Date
          const parsedMessage: Message = {
            ...message,
            createdAt: new Date(message.createdAt),
          };

          // Play notification sound for new user messages
          if (parsedMessage.role === "USER") {
            const audio = new Audio("/sounds/notification.mp3");
            audio.volume = 0.5;
            audio
              .play()
              .catch((err) => console.error("Error playing sound:", err));
          }

          if (selectedSession?.id === session.id) {
            setMessages((prev) => [...prev, parsedMessage]);

            // Mark as read immediately if this is the selected session
            if (parsedMessage.role === "USER" && adminId) {
              markMessagesAsRead(session.id, adminId);
            }
          }

          setSessions((prev) =>
            prev.map((s) =>
              s.id === session.id
                ? {
                    ...s,
                    lastMessage: parsedMessage.content,
                    lastMessageTime: parsedMessage.createdAt,
                    unreadCount:
                      selectedSession?.id === session.id
                        ? 0
                        : parsedMessage.role === "USER"
                        ? s.unreadCount + 1
                        : s.unreadCount,
                  }
                : s
            )
          );
        }
      );

      // Listen for typing indicator
      channel.bind("user-typing", () => {
        if (selectedSession?.id === session.id) {
          setIsTyping(true);

          // Clear previous timeout
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }

          // Set new timeout to hide typing indicator after 3 seconds
          typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
          }, 3000);
        }
      });
    });

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [sessions, selectedSession, adminId]);

  // Auto-scroll messages to the bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle session selection: load history and mark as read
  const handleSessionSelect = useCallback(
    async (session: ChatSession) => {
      setSelectedSession(session);
      setMessages([]);
      setIsLoading(true);

      try {
        const result = await getChatHistory(session.id);
        if (result.success && result.messages) {
          setMessages(
            result.messages.map((msg) => ({
              ...msg,
              createdAt: new Date(msg.createdAt),
            }))
          );

          // Mark messages as read when session is selected
          if (adminId) {
            await markMessagesAsRead(session.id, adminId);
          }
        }

        // Update the unreadCount in the sessions list
        setSessions((prev) =>
          prev.map((s) => (s.id === session.id ? { ...s, unreadCount: 0 } : s))
        );

        // Focus on the input field
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      } catch (error) {
        console.error("Error selecting session:", error);
        toast.error("Failed to load chat history");
      } finally {
        setIsLoading(false);
      }
    },
    [adminId]
  );

  // Send a message from the admin
  const sendMessageHandler = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || !selectedSession) return;
      setIsLoading(true);

      // Create an optimistic message
      const optimisticMessage: Message = {
        id: `local-${Date.now()}`,
        userId: selectedSession.id,
        role: "ADMIN",
        content: input,
        createdAt: new Date(),
        read: true,
        senderName: adminName,
      };

      setMessages((prev) => [...prev, optimisticMessage]);
      setInput("");

      try {
        await adminSendMessage({
          userId: selectedSession.id,
          content: input,
          adminName: adminName,
        });
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message");

        // Remove the optimistic message if there was an error
        setMessages((prev) =>
          prev.filter((msg) => msg.id !== optimisticMessage.id)
        );
      } finally {
        setIsLoading(false);
        // Focus back on the input
        inputRef.current?.focus();
      }
    },
    [input, selectedSession, adminName]
  );

  // Update admin status
  const handleStatusChange = useCallback(
    async (status: "ONLINE" | "AWAY" | "OFFLINE") => {
      setAdminStatus(status);
      try {
        if (adminId) await updateAdminStatus(adminId, status);

        // Show toast notification
        toast.success("Status Updated", {
          description: `Your status is now ${status.toLowerCase()}`,
        });
      } catch (error) {
        console.error("Error updating status:", error);
        toast("Error", {
          description: "Failed to update status",
        });
      }
    },
    [adminId]
  );

  // Filter sessions by search and status
  const filteredSessions = sessions.filter((session) => {
    const statusMatch =
      filter === "all"
        ? true
        : filter === "waiting"
        ? session.status === "waiting"
        : session.status === "active";
    const searchMatch =
      session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (session.email &&
        session.email.toLowerCase().includes(searchQuery.toLowerCase()));
    return statusMatch && searchMatch;
  });

  // Get the total number of unread messages across all sessions
  const totalUnreadCount = sessions.reduce(
    (acc, session) => acc + session.unreadCount,
    0
  );

  // Format relative time
  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Session list */}
      <div className="w-[30%] border-r overflow-hidden flex flex-col">
        <div className="px-4 py-2 border-b">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg">Customer Chats</h2>
            {totalUnreadCount > 0 && (
              <Badge variant="destructive" className="rounded-full">
                {totalUnreadCount}
              </Badge>
            )}
          </div>
          <div className=" relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex mt-4 space-x-1">
            <Button
              variant={adminStatus === "ONLINE" ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => handleStatusChange("ONLINE")}
            >
              Online
            </Button>
            <Button
              variant={adminStatus === "AWAY" ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => handleStatusChange("AWAY")}
            >
              Away
            </Button>
            <Button
              variant={adminStatus === "OFFLINE" ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => handleStatusChange("OFFLINE")}
            >
              Offline
            </Button>
          </div>
        </div>
        <Tabs defaultValue="all" className="px-4 pt-4">
          <TabsList className="w-full">
            <TabsTrigger
              value="all"
              className="flex-1"
              onClick={() => setFilter("all")}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="waiting"
              className="flex-1"
              onClick={() => setFilter("waiting")}
            >
              Waiting
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="flex-1"
              onClick={() => setFilter("active")}
            >
              Active
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="overflow-y-auto flex-1 px-3 mt-4">
          {isLoading && sessions.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="flex justify-center items-center h-32 text-gray-500">
              No active conversations
            </div>
          ) : (
            filteredSessions.map((session) => (
              <div
                key={session.id}
                className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                  selectedSession?.id === session.id ? "bg-gray-100" : ""
                } ${
                  session.unreadCount > 0 ? "border-l-4 border-l-blue-500" : ""
                }`}
                onClick={() => handleSessionSelect(session)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <User className="h-10 w-10 bg-gray-200 p-2 rounded-full" />
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                          session.status === "active"
                            ? "bg-green-500"
                            : session.status === "waiting"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="ml-3 flex-1 truncate">
                      <p className="font-medium text-sm">{session.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.email || "No email provided"}
                      </p>
                    </div>
                  </div>
                  {session.unreadCount > 0 && (
                    <Badge variant="destructive" className="rounded-full">
                      {session.unreadCount}
                    </Badge>
                  )}
                </div>
                {session.lastMessage && (
                  <div className="mt-1">
                    <p className="text-xs text-gray-500 truncate">
                      {session.lastMessage}
                    </p>
                    {session.lastMessageTime && (
                      <p className="text-xs text-gray-400">
                        {getRelativeTime(new Date(session.lastMessageTime))}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div className="p-3 mt-auto border-t">
          <Button
            variant="outline"
            className="w-full"
            onClick={loadChatSessions}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : null}
            Refresh Sessions
          </Button>
        </div>
      </div>

      {/* Chat area */}
      <div className="w-[70%] flex flex-col h-full">
        {selectedSession ? (
          <>
            {/* Chat header */}
            <div className="bg-white p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-8 w-8 bg-gray-200 p-1 rounded-full" />
                <div className="ml-3">
                  <p className="font-medium">{selectedSession.name}</p>
                  <div className="flex items-center">
                    <span
                      className={`h-2 w-2 rounded-full mr-1 ${
                        selectedSession.status === "active"
                          ? "bg-green-500"
                          : selectedSession.status === "waiting"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    />
                    <p className="text-xs text-gray-500">
                      {selectedSession.status === "active"
                        ? "Active"
                        : selectedSession.status === "waiting"
                        ? "Waiting"
                        : "Inactive"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send notification</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <PhoneCall className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Call customer</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.length === 0 && isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <MessageSquare className="h-12 w-12 mb-2 text-gray-400" />
                  <p>No messages yet</p>
                  <p className="text-sm">
                    Send a message to start the conversation
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "ADMIN"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.role === "ADMIN"
                            ? "bg-blue-600 text-white"
                            : message.role === "BOT"
                            ? "bg-gray-100"
                            : "bg-white border text-gray-900"
                        }`}
                      >
                        {message.senderName && (
                          <p className="text-xs font-medium mb-1">
                            {message.senderName}
                          </p>
                        )}
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                        <p className="text-xs mt-1 opacity-70 text-right">
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border rounded-lg p-3 max-w-[70%]">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {selectedSession && (
              <div className="bg-white border-t border-b p-2 flex gap-2 overflow-x-auto">
                {CANNED_RESPONSES.map((response, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() => {
                      setInput(response);
                      inputRef.current?.focus();
                    }}
                  >
                    {response.length > 30
                      ? `${response.substring(0, 30)}...`
                      : response}
                  </Button>
                ))}
              </div>
            )}

            {/* Message input */}
            <div className="bg-white p-4">
              <form
                onSubmit={sendMessageHandler}
                className="flex items-center gap-2"
              >
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 bg-gray-100 resize-none"
                  disabled={isLoading}
                  aria-label="Type your message"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (input.trim()) {
                        sendMessageHandler(e);
                      }
                    }
                  }}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="h-full px-6"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : null}
                  Send
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium">No chat selected</h3>
              <p className="text-gray-500">
                Select a user from the list to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
