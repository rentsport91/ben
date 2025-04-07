import { redirect } from "next/navigation";
import AdminDashboard from "@/components/features/chatbot/admin-chat-component";
import { auth } from "~/auth";

export default async function AdminPage() {
  const session = await auth();

  // Redirect if not logged in or not an admin
  if (!session?.user) {
    redirect("/");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return <AdminDashboard />;
}
