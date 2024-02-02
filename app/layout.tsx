import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/theme/theme-provider";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Patrick's blog",
  description: "Powered by NextJS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="light">
      <body className="w-screen sm:min-w-[800px] md:min-w-[800px] lg:min-w-[800px] xl:min-w-[800px] 2xl:min-w-[800px]">
        <SessionProvider>
          <ThemeProvider />
          <Toaster richColors />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
