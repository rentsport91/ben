import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import { ReactNode } from "react";
import PageTransition from "@/components/Page.transition";

const PublicLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <PageTransition>
      <main>
        <Header />
        <div className="">{children}</div>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default PublicLayout;
