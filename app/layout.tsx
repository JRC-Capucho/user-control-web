"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ThemeChanger } from "@/components/global/theme-changer";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oneMonth = 60 * 24 * 30;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextTopLoader color="#213752" />
        <SessionProvider refetchInterval={oneMonth}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider disableTransitionOnChange attribute="class">
              {children}
            </ThemeProvider>
            <ThemeChanger />
          </QueryClientProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
