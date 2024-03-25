import { Toaster } from "@/components/ui/sonner";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeColorProvider from "@/components/theme/theme-color-provider";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { siteMetadata } from "@/data/site";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "./",
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: "summary_large_image",
    images: [siteMetadata.socialBanner],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html
        className=" scroll-pt-[5rem] scroll-smooth"
        data-theme="light"
        style={{ colorScheme: "light" }}
        // prevent error: Extra attributes from the server https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        suppressHydrationWarning
      >
        <body className="w-screen sm:min-w-[800px] md:min-w-[800px] lg:min-w-[800px] xl:min-w-[800px] 2xl:min-w-[800px] antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ThemeColorProvider />
            <Toaster richColors />
            {children}
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
