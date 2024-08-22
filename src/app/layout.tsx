import "@/app/globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

import { Archivo } from "next/font/google";
import { Libre_Franklin } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "./_header/header";
import Sidebar from "./layout/sidebar";
import { getCurrentUser } from "@/lib/session";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});
const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_franklin",
});

export const metadata: Metadata = {
  title: "WDC Template",
  icons: [
    { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon.ico" },
  ],
  keywords: "yolo",
  description: "A simple next.js template including drizzle and lucia auth",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          archivo.variable + " " + libre_franklin.variable,
        )}
      >
        <Providers>
          <NextTopLoader />
          <Header />
          <div className="flex h-screen border-collapse overflow-hidden">
            {
              user && (
                <Sidebar role={user.role} />
              ) /*FL hidden sidebar if not login*/
            }
            <main className="flex-1 overflow-y-auto overflow-x-hidden bg-secondary/10 pb-1 pt-16">
              <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
            </main>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
