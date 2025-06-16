import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/dashboard.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "../components/Navbar";
import { Providers } from "@/components/Providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Expense Tracker",
  description: "Track your personal finances and expenses",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const isLoginPage = children?.toString().includes('LoginPage') ?? false;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background font-sans antialiased",
          !session && !isLoginPage ? "bg-gray-50" : ""
        )}
      >
        <Providers session={session}>
          <div className="relative flex min-h-screen flex-col">
            {!isLoginPage && <Navbar />}
            <div className="flex-1">
              {isLoginPage ? (
                children
              ) : (
                <main className="container mx-auto px-4 py-8 max-w-7xl">
                  {children}
                </main>
              )}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
} 