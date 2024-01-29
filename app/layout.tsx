import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/theme/theme-provider";

export const metadata: Metadata = {
  title: "Patrick's blog",
  description: "Powered by NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <ThemeProvider />
        <Toaster richColors />
        {children}
      </body>
    </html>
  );
}
