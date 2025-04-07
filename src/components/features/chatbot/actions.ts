/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { prisma } from "@/constants/config/db";
import { pusher } from "@/lib/pusher";
import { redirect } from "next/navigation";
import { auth } from "~/auth";

export const createChatSession = async (name: string, email: string) => {
  try {
    const session = await prisma.chatSession.create({
      data: { name, email },
    });
    return { success: true, session };
  } catch (error) {
    return { success: false, error: "Failed to start chat" };
  }
};

export const sendMessage = async (_: unknown, formData: FormData) => {
  const rawData = Object.fromEntries(formData.entries());
  const { content, sessionId, senderName } = rawData as {
    content: string;
    sessionId: string;
    senderName: string;
  };

  try {
    const message = await prisma.message.create({
      data: {
        content,
        chatSessionId: sessionId,
        senderName,
        role: "USER",
      },
      include: { chatSession: true },
    });

    await pusher.trigger(`chat-${sessionId}`, "new-message", {
      id: message.id,
      content: message.content,
      role: message.role,
      createdAt: message.createdAt,
      senderName,
    });

    return { success: true, message };
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : error,
    };
  }
};

export const pairWithAdmin = async (
  sessionId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const availableAdmin = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
        status: "ONLINE",
      },
      include: {
        _count: {
          select: {
            adminPairings: {
              where: { active: true },
            },
          },
        },
      },
      orderBy: {
        adminPairings: { _count: "asc" },
      },
    });
    if (!availableAdmin) {
      return { success: false, error: "No available agents" };
    }

    await prisma.adminUserPairing.create({
      data: {
        chatSessionId: sessionId,
        adminId: availableAdmin.id,
        active: true,
      },
    });

    await pusher.trigger("presence-admins", "admin-status-update", {
      adminId: availableAdmin.id,
      status: "busy",
    });

    return { success: true };
  } catch (error) {
    console.error("pairWithAdmin error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Send a message from admin
export const adminSendMessage = async (data: {
  userId: string;
  content: string;
  adminName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<{ success: boolean; message?: any; error?: string }> => {
  try {
    const message = await prisma.message.create({
      data: {
        content: data.content,
        chatSessionId: data.userId,
        senderName: data.adminName,
        role: "ADMIN",
      },
    });

    await pusher.trigger(`chat-${data.userId}`, "new-message", {
      id: message.id,
      content: message.content,
      role: message.role,
      createdAt: message.createdAt,
      senderName: data.adminName,
    });

    return { success: true, message };
  } catch (error) {
    console.error("adminSendMessage error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Get chat sessions for the admin dashboard
export const getAdminChatSessions = async (): Promise<{
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sessions?: any[];
  error?: string;
}> => {
  try {
    const session = await auth();
    if (!session?.user) redirect("/");
    if (session.user.role !== "ADMIN") throw new Error("Unauthorized");

    const sessions = await prisma.chatSession.findMany({
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        pairing: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Count unread messages for the admin (adjust criteria as needed)
    const unreadCount = await prisma.message.count({
      where: {
        chatSessionId: session.user.id,
        role: "USER",
        read: false,
      },
    });

    const formattedSessions = sessions.map((sess) => {
      const lastMessage = sess.messages[0];
      const isAssigned = sess.pairing !== null;
      return {
        id: sess.id,
        name: sess.name,
        email: sess.email || "",
        lastMessage: lastMessage?.content,
        lastMessageTime: lastMessage?.createdAt,
        unreadCount,
        status: sess.pairing?.active ? "active" : "waiting",
        assigned: isAssigned,
      };
    });

    return { success: true, sessions: formattedSessions };
  } catch (error) {
    console.error("Error fetching admin sessions:", error);
    return { success: false, error: "Failed to fetch sessions" };
  }
};

// Get full chat history and mark messages as read
export const getChatHistory = async (
  sessionId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ success: boolean; messages?: any[]; error?: string }> => {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/");
  try {
    const messages = await prisma.message.findMany({
      where: { chatSessionId: sessionId },
      orderBy: { createdAt: "asc" },
    });

    await prisma.message.updateMany({
      where: {
        chatSessionId: sessionId,
        role: "USER",
        read: false,
      },
      data: {
        read: true,
      },
    });

    const formattedMessages = messages.map((msg) => ({
      id: msg.id,
      userId: msg.chatSessionId,
      role: msg.role.toLowerCase(),
      content: msg.content,
      createdAt: msg.createdAt,
      read: msg.read,
      senderName: msg.senderName,
    }));

    return { success: true, messages: formattedMessages };
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return { success: false, error: "Failed to fetch chat history" };
  }
};

// Update the admin's status
export const updateAdminStatus = async (
  adminId: string,
  status: "ONLINE" | "AWAY" | "OFFLINE"
): Promise<{ success: boolean; error?: string }> => {
  try {
    await prisma.user.update({
      where: { id: adminId },
      data: { status },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating admin status:", error);
    return { success: false, error: "Failed to update status" };
  }
};

// Assign a chat session to the current admin
export const assignChatToAdmin = async (
  sessionId: string
): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    const session = await auth();
    if (!session?.user) redirect("/");
    const admin = await prisma.user.findUnique({
      where: {
        id: session.user.id,
        role: "ADMIN",
      },
    });
    if (!admin) {
      throw new Error("Invalid admin ID or user is not an administrator");
    }

    await pusher.trigger(`chat-${sessionId}`, "admin-paired", {
      adminId: admin.id,
      adminName: "Agent",
      timestamp: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Chat assignment error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Chat assignment failed",
    };
  }
};

// Mark user messages as read and notify the user
export const markMessagesAsRead = async (
  userId: string,
  adminId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    await prisma.message.updateMany({
      where: {
        chatSessionId: userId,
        role: "USER",
        read: false,
      },
      data: {
        read: true,
        readBy: adminId,
      },
    });

    await pusher.trigger(`chat-${userId}`, "messages-read", {
      adminId,
      timestamp: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error marking messages as read:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
