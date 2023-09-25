import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";
import { ConfettiProvider } from "@/providers/ConfettiProvider";

export const metadata: Metadata = {
  title: "Matrix - LMS",
  description: "Learning Management System Udoo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
