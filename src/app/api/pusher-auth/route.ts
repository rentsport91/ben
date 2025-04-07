import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusherServer";
import { auth } from "~/auth";

export async function POST(request: NextRequest) {
  const session = await auth();

  // Only allow authenticated users
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Parse the request body
  const data = await request.json();
  const socketId = data.socket_id;
  const channel = data.channel_name;

  // For presence channels, add user data
  if (channel.startsWith("presence-")) {
    // Only admins can join presence channels
    if (session.user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const presenceData = {
      user_id: session.user.id,
      user_info: {
        name: session.user.name || "Agent",
        email: session.user.email,
        role: session.user.role,
      },
    };

    // Auth with presence data
    const authResponse = pusherServer.authorizeChannel(
      socketId,
      channel,
      presenceData
    );

    return NextResponse.json(authResponse);
  }

  // For private channels, do simple auth
  if (channel.startsWith(`admin-${session.user.id}`)) {
    const authResponse = pusherServer.authorizeChannel(socketId, channel);
    return NextResponse.json(authResponse);
  }

  // Reject other channel subscriptions
  return new NextResponse("Forbidden", { status: 403 });
}
