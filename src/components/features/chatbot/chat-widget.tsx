"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  startTransition,
  useActionState,
} from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Pusher from "pusher-js";
import {
  createChatSession,
  sendMessage,
  pairWithAdmin,
} from "@/components/features/chatbot/actions";

type Message = {
  id: string;
  content: string;
  role: "USER" | "ADMIN" | "BOT";
  createdAt: Date;
  senderName?: string;
};

interface SessionMetadata {
  id: string;
  name: string;
  adminRequested: boolean;
  pendingAdminMessages: boolean;
}

export default function ChatWidget() {
  // Using a custom action hook for sending messages
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, action, isPending] = useActionState(sendMessage, null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState("");

  // Admin related states
  const [hasAdmin, setHasAdmin] = useState(false);
  const [adminRequested, setAdminRequested] = useState(false);
  const [waitingForAdmin, setWaitingForAdmin] = useState(false);
  const [pendingAdminMessages, setPendingAdminMessages] = useState(false);

  // Get environment variables safely with fallbacks
  const pusherKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "";
  const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || "eu";

  const pusherRef = useRef<Pusher | null>(null);

  // Restore session from localStorage if available
  useEffect(() => {
    const savedSession = localStorage.getItem("chatSession");
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession) as SessionMetadata;
        setSessionId(sessionData.id);
        setUserName(sessionData.name);
        setAdminRequested(sessionData.adminRequested);
        setPendingAdminMessages(sessionData.pendingAdminMessages);
      } catch (error) {
        console.error("Failed to restore chat session:", error);
        localStorage.removeItem("chatSession");
      }
    }
  }, []);

  // Initialize Pusher for admin presence
  useEffect(() => {
    if (!pusherRef.current && pusherKey && pusherCluster) {
      pusherRef.current = new Pusher(pusherKey, {
        cluster: pusherCluster,
      });
      console.log("Pusher client initialized");
    }

    const channel = pusherRef.current?.subscribe(`presence-admins`);

    channel?.bind("pusher:subscription_succeeded", () => {
      console.log("Connected to admin presence channel");
    });

    return () => {
      if (channel) {
        channel.unbind_all();
        channel.unsubscribe();
      }
    };
  }, [pusherKey, pusherCluster]);

  const startChat = async ({
    email,
    username,
  }: {
    email: string;
    username: string;
  }) => {
    const result = await createChatSession(username, email);
    if (result.success && result.session) {
      setSessionId(result.session.id);

      // Store session data in localStorage
      const sessionData: SessionMetadata = {
        id: result.session.id,
        name: username,
        adminRequested: false,
        pendingAdminMessages: false,
      };
      localStorage.setItem("chatSession", JSON.stringify(sessionData));

      setMessages([
        {
          id: "welcome",
          content: "How can I help you today?",
          role: "BOT",
          createdAt: new Date(),
        },
      ]);
    }
  };

  // Listen for messages and admin pairing on the chat channel
  useEffect(() => {
    if (!sessionId) return;

    const messageChannel = pusherRef.current?.subscribe(`chat-${sessionId}`);

    // Handle admin pairing event
    messageChannel?.bind("admin-paired", () => {
      setHasAdmin(true);
      setWaitingForAdmin(false);

      // Update messages to notify user of admin connection
      setMessages((prev) => [
        ...prev,
        {
          id: `admin-joined-${Date.now()}`,
          content: `${"Agent"} has joined the chat.`,
          role: "BOT",
          createdAt: new Date(),
        },
      ]);

      // Update localStorage
      if (localStorage.getItem("chatSession")) {
        const sessionData = JSON.parse(
          localStorage.getItem("chatSession")!
        ) as SessionMetadata;
        sessionData.adminRequested = true;
        sessionData.pendingAdminMessages = false;
        localStorage.setItem("chatSession", JSON.stringify(sessionData));
      }
    });

    // Handle new messages
    messageChannel?.bind("new-message", (data: Message) => {
      setMessages((prevState) => {
        // Remove any optimistic message that matches the confirmed message
        const filtered = prevState.filter(
          (msg) =>
            !(
              msg.id.startsWith("local-") &&
              msg.content === data.content &&
              msg.role === data.role
            )
        );
        return [...filtered, { ...data, createdAt: new Date(data.createdAt) }];
      });
    });

    return () => {
      messageChannel?.unbind_all();
      messageChannel?.unsubscribe();
    };
  }, [sessionId]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !sessionId) return;

    // Capture the content before clearing it
    const currentContent = content;

    // Create an optimistic message
    const localMessage: Message = {
      id: `local-${Date.now()}`,
      content: currentContent,
      role: "USER",
      createdAt: new Date(),
      senderName: username,
    };

    setMessages((prev) => [...prev, localMessage]);
    setContent("");

    // If admin was requested but not connected, set pendingAdminMessages
    if (adminRequested && !hasAdmin) {
      setPendingAdminMessages(true);

      // Update localStorage
      if (localStorage.getItem("chatSession")) {
        const sessionData = JSON.parse(
          localStorage.getItem("chatSession")!
        ) as SessionMetadata;
        sessionData.pendingAdminMessages = true;
        localStorage.setItem("chatSession", JSON.stringify(sessionData));
      }
    }

    // Wrap the action call in startTransition so that isPending updates correctly
    startTransition(() => {
      (async () => {
        try {
          const formData = new FormData();
          formData.append("content", currentContent);
          formData.append("sessionId", sessionId);
          formData.append("senderName", username);
          await action(formData);
        } catch (error) {
          console.error("Error sending message:", error);
          setMessages((prev) => [
            ...prev,
            {
              id: `error-${Date.now()}`,
              content: "Failed to send message. Please try again.",
              role: "BOT",
              createdAt: new Date(),
            },
          ]);
        }
      })();
    });
  };

  const requestAdmin = async () => {
    if (!sessionId) return;

    setWaitingForAdmin(true);
    setAdminRequested(true);

    // Update localStorage
    if (localStorage.getItem("chatSession")) {
      const sessionData = JSON.parse(
        localStorage.getItem("chatSession")!
      ) as SessionMetadata;
      sessionData.adminRequested = true;
      localStorage.setItem("chatSession", JSON.stringify(sessionData));
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `waiting-${Date.now()}`,
        content:
          "We've received your request to speak to an agent. You can continue sending messages and an agent will respond when available.",
        role: "BOT",
        createdAt: new Date(),
      },
    ]);

    try {
      const result = await pairWithAdmin(sessionId);
      if (!result.success) {
        setWaitingForAdmin(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `admin-status-${Date.now()}`,
            content:
              "Our agents are currently unavailable. Your messages will be saved and an agent will respond as soon as possible.",
            role: "BOT",
            createdAt: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error pairing with admin:", error);
      setWaitingForAdmin(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          content:
            "Our agents are currently unavailable. Your messages will be saved and an agent will respond as soon as possible.",
          role: "BOT",
          createdAt: new Date(),
        },
      ]);
    }
  };

  // Clear the current chat session
  const handleEndChat = () => {
    localStorage.removeItem("chatSession");
    setSessionId("");
    setMessages([]);
    setAdminRequested(false);
    setHasAdmin(false);
    setPendingAdminMessages(false);
    setWaitingForAdmin(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-[350px] bg-white rounded-lg shadow-lg border">
          <div className="p-4 border-b flex justify-between items-center bg-gray-50">
            <h3 className="font-semibold">Chat Support</h3>
            <div className="flex gap-2">
              {sessionId && (
                <button
                  onClick={handleEndChat}
                  className="text-gray-500 hover:text-red-500"
                  aria-label="End chat"
                >
                  End Chat
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "USER" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg ${
                      message.role === "USER"
                        ? "bg-blue-600 text-white"
                        : message.role === "ADMIN"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      {message.senderName && (
                        <span className="text-xs font-medium">
                          {message.senderName}
                        </span>
                      )}
                      <time
                        className="text-xs opacity-75"
                        dateTime={new Date(message.createdAt).toISOString()}
                      >
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </time>
                    </div>
                    <p className="text-sm break-words">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4">
              {!sessionId ? (
                <div className="space-y-4">
                  <Input
                    placeholder="Your name"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    aria-label="Your name"
                  />
                  <Input
                    placeholder="Email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Your email"
                  />
                  <Button
                    onClick={() => startChat({ username, email })}
                    className="w-full"
                    disabled={!username.trim()}
                  >
                    Start Chat
                  </Button>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSend} className="flex gap-2">
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder={
                        hasAdmin
                          ? "Message support agent..."
                          : adminRequested
                          ? "Message to agent (offline)..."
                          : "Type your message"
                      }
                      className="resize-none flex-1"
                      disabled={isPending}
                      aria-label="Type your message"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend(e);
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isPending || !content.trim()}
                      aria-label="Send message"
                    >
                      {isPending ? (
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send size={18} />
                      )}
                    </Button>
                  </form>
                  {!hasAdmin && !adminRequested && (
                    <Button
                      onClick={requestAdmin}
                      variant="outline"
                      className="w-full mt-2"
                      disabled={waitingForAdmin}
                    >
                      {waitingForAdmin
                        ? "Connecting..."
                        : "Talk to Human Agent"}
                    </Button>
                  )}
                  {adminRequested && !hasAdmin && (
                    <div className="text-xs text-gray-500 text-center mt-2">
                      {pendingAdminMessages
                        ? "Your messages will be viewed by an agent when they connect"
                        : "Request sent - an agent will connect when available"}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg hover:bg-secondary/80 transition-colors"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}
