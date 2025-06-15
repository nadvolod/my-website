import FloatingActionButton from "@/components/FloatingActionButton";
import Navigation from "@/components/Navigation";
import StructuredData from "@/components/StructuredData";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: "Nikolay Advolodkin - Developer Advocate & Automation Expert",
  description: "Leading automation expert with 16+ years experience. Training 150,000+ developers across 190 countries in test automation, AI, and modern development practices.",
  keywords: [
    "test automation",
    "developer advocate", 
    "automation expert",
    "selenium",
    "playwright",
    "javascript testing",
    "typescript",
    "AI training",
    "software testing",
    "quality assurance"
  ],
  authors: [{ name: "Nikolay Advolodkin" }],
  creator: "Nikolay Advolodkin",
  publisher: "Nikolay Advolodkin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nikolayadvolodkin.com",
    title: "Nikolay Advolodkin - Developer Advocate & Automation Expert",
    description: "Leading automation expert with 16+ years experience. Training 150,000+ developers across 190 countries in test automation, AI, and modern development practices.",
    siteName: "Nikolay Advolodkin",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nikolay Advolodkin - Developer Advocate & Automation Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikolay Advolodkin - Developer Advocate & Automation Expert",
    description: "Leading automation expert with 16+ years experience. Training 150,000+ developers across 190 countries in test automation, AI, and modern development practices.",
    creator: "@Nikolay_A00",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
  metadataBase: new URL('https://nikolayadvolodkin.com'),
  alternates: {
    canonical: 'https://nikolayadvolodkin.com',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ultimateqa.com" />
        <link rel="preconnect" href="https://www.linkedin.com" />
        
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://www.udemy.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        <StructuredData />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider>
          <Navigation />
          <main className="pt-16 sm:pt-20">
            {children}
          </main>
          <FloatingActionButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
