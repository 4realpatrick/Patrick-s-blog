import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/theme/theme-provider";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import DictionaryProvider from "@/components/dictionary-provider";

export const metadata: Metadata = {
  title: "Patrick's blog",
  description: "Powered by NextJS",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang} data-theme="light">
      <body className="w-screen sm:min-w-[800px] md:min-w-[800px] lg:min-w-[800px] xl:min-w-[800px] 2xl:min-w-[800px]">
        <SessionProvider>
          <ThemeProvider />
          <Toaster richColors />
          <DictionaryProvider lang={params.lang} dictionary={dictionary}>
            <Navbar dictionary={dictionary.components.navbar} />
            {children}
          </DictionaryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
