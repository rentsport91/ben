import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import { ReactNode } from "react";
import ChatWidget from "@/components/features/chatbot/chat-widget";
import "public/google5c1470dafb6e2f0a.html";

const PublicLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      <div className="">{children}</div>
      <ChatWidget />

      <Footer />
    </main>
  );
};

export default PublicLayout;
