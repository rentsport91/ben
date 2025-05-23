import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amermax logistics",
  description: "Our Global logistics Solutions",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased`}>
        <SessionProvider
          refetchInterval={60 * 60} // 1 hour
          refetchOnWindowFocus={false}
        >
          <main className="">{children}</main>

          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
