import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/language-context";
import { ClerkProvider } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "વિદ્યાર્થી સહાયક",
  description: "GSEB વિદ્યાર્થીઓ માટે AI-સંચાલિત લર્નિંગ પ્લેટફોર્મ.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="gu">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati:wght@400;600;700;900&family=Baloo+Bhai+2:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <meta name="application-name" content="વિદ્યાર્થી સહાયક" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="વિદ્યાર્થી સહાયક" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#09090B" />
        </head>
        <body className="font-body antialiased nunito-sans">
          <LanguageProvider>
            <div className="relative min-h-screen ">{children}</div>
            <Toaster />
          </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
