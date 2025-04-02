"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  MessageSquare,
  X,
  MoreHorizontal,
  Send,
  Smile,
  Paperclip,
} from "lucide-react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Validation schema
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<z.infer<typeof userSchema> | null>(null);
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialOptionsShown, setInitialOptionsShown] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = useCallback(() => {
    setOpen((prev) => !prev);
    if (!open && user) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, user]);

  const handleRegistration = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const result = userSchema.safeParse({
          name: tempName,
          email: tempEmail,
        });

        if (!result.success) {
          const formattedErrors = result.error.format();
          setErrors({
            name: formattedErrors.name?._errors[0],
            email: formattedErrors.email?._errors[0],
          });
          return;
        }

        setErrors({});
        setUser(result.data);
        setInitialOptionsShown(true);

        setMessages([
          {
            id: crypto.randomUUID(),
            role: "bot",
            content: `Want to chat? I'm an AI chatbot here to help you find your way.`,
            timestamp: new Date(),
          },
        ]);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
    [tempName, tempEmail]
  );

  const handleQuickOption = useCallback((option: string) => {
    setInitialOptionsShown(false);
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: option,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      let response = "";
      switch (option) {
        case "I need Support":
          response =
            "I'm happy to help with support! What specific issue are you experiencing?";
          break;
        case "Get started for Free":
          response =
            "Great! Let me walk you through our free options. What are you looking to accomplish?";
          break;
        // case "Chat with Sales Team":
        //   response =
        //     "I'll connect you with our sales team. Could you tell me a bit about what you're looking for?";
        //   break;
        default:
          response = "How can I assist you today?";
      }

      const botResponse: Message = {
        id: crypto.randomUUID(),
        role: "bot",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  }, []);

  const sendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || !user) return;

      setInitialOptionsShown(false);
      const newMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: input,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setInput("");
      setIsLoading(true);

      try {
        // Simulated API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const botResponse: Message = {
          id: crypto.randomUUID(),
          role: "bot",
          content: `Thanks for your message! How else can I help you with "${input.substring(
            0,
            30
          )}${input.length > 30 ? "..." : ""}"?`,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botResponse]);
      } catch (error) {
        console.error("Failed to send message:", error);
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: "bot",
          content:
            "Sorry, there was an error sending your message. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [input, user]
  );

  // Close chat when clicking outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".chat-widget") && !target.closest(".chat-toggle")) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Initial welcome message
  useEffect(() => {
    if (open && !user && messages.length === 0) {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "bot",
          content: "Want to chat? Enter your details to get started.",
          timestamp: new Date(),
        },
      ]);
    }
  }, [open, user, messages.length]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="chat-widget w-[350px] bg-white rounded-lg shadow-lg flex flex-col border-4 border-purple-200">
          {/* Header */}
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="font-bold text-sm">Chat Box</h2>
            <div className="flex gap-2">
              <button
                className="text-gray-500 hover:text-gray-700"
                aria-label="More options"
              >
                <MoreHorizontal size={20} />
              </button>
              <button
                onClick={toggleChat}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {!user ? (
            // Registration form
            <div className="p-4 flex-1 overflow-y-auto">
              <form onSubmit={handleRegistration} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label="Your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-secondary text-white p-3 rounded-md hover:bg-secondary/80 transition-colors"
                >
                  Start Chatting
                </Button>
              </form>
            </div>
          ) : (
            <>
              {/* Chat content */}
              <div
                className="flex-1 overflow-y-auto p-4 space-y-4"
                style={{ maxHeight: "350px" }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-secondary text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words ">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Quick option buttons */}
                {initialOptionsShown &&
                  user &&
                  messages.length > 0 &&
                  messages[messages.length - 1].role === "bot" && (
                    <div className="flex flex-col gap-2 mt-3">
                      <button
                        onClick={() => handleQuickOption("I need Support")}
                        className="text-left text-sm py-2 px-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        I need Support
                      </button>
                      <button
                        onClick={() =>
                          handleQuickOption("Get started for Free")
                        }
                        className="text-left text-sm py-2 px-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        Get started for Free
                      </button>
                      <button
                        onClick={() =>
                          handleQuickOption("Chat with Sales Team")
                        }
                        className="text-left text-sm py-2 px-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        Chat with Sales Team
                      </button>
                    </div>
                  )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
              <div className="border-t">
                <form onSubmit={sendMessage} className="flex items-center px-3">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Add emoji"
                  >
                    <Smile size={20} />
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Attach file"
                  >
                    <Paperclip size={20} />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Write a message"
                    className="flex-1 p-2 mx-2 focus:outline-none text-sm"
                    disabled={isLoading}
                    aria-label="Write a message"
                  />
                  <button
                    type="submit"
                    className={`p-2 rounded-full ${
                      isLoading || !input.trim()
                        ? "text-gray-400"
                        : "text-secondary hover:text-secondary/80"
                    }`}
                    disabled={isLoading || !input.trim()}
                    aria-label="Send message"
                  >
                    <Send size={20} />
                  </button>
                </form>

                {/* Powered by footer */}
                <div className="text-center text-xs text-gray-500 py-2">
                  Powered by Kasper :)
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="chat-toggle w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-secondary/80 transition-colors shadow-lg"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
