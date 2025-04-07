/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState, useRef, useActionState } from "react";

import { pusherClient } from "@/lib/pusher";
import { ChevronDown, MessageSquare, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ChatWidget() {
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="fixed bottom-10 right-5 flex flex-col items-end z-50">
      {/* Chat widget toggle button */}
      <div className="flex items-center gap-3">
        {!isOpen ? (
          <div
            className="px-4 py-3 bg-white rounded-2xl shadow-2xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <span className="text-base font-medium">Chat with us 👋</span>
          </div>
        ) : null}

        {!isOpen && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-secondary text-white rounded-full p-4 hover:bg-secondary transition-all shadow-2xl cursor-pointer"
            >
              <MessageSquare fill="white" />
            </button>
            {5 > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 rounded-full"
              >
                {2}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="mt-3 bg-white rounded-lg shadow-xl w-80 sm:w-80 overflow-hidden flex flex-col border border-gray-200 max-h-[500px]">
          {/* Chat header */}
          <div className="bg-secondary text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col"></div>
              <button
                className="p-1.5 bg-transparent hover:bg-gray-50/20 rounded-lg"
                onClick={() => setIsOpen((prev) => false)}
              >
                <ChevronDown size={24} />
              </button>
            </div>
          </div>

          {/* Chat content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Chat input */}
            <div className="border-t border-gray-200 p-3">
              <form id="chat-form" className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex-1 border z-40"
                  required
                />
                <Button size={"icon"}>
                  <Send />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
