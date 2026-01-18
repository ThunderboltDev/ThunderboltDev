import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import {
  getOrganizationJsonLd,
  getPersonJsonLd,
  getWebSiteJsonLd,
  JsonLd,
} from "@/components/blog/jsonld";
import { Footer } from "@/components/main/footer";
import { url } from "@/config";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "⚡ Thunderbolt",
    template: "%s | ⚡ Thunderbolt",
  },
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  description:
    "I am a self taught web developer building beautiful websites one line of code at a time.",
  applicationName: "Thunderbolt",
  creator: "Thunderbolt",
  category: "technology",
  icons: {
    icon: "/logo.webp",
    apple: "/logo.webp",
  },
  openGraph: {
    siteName: "⚡ Thunderbolt",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/preview.webp",
        width: 1200,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "Thunderbolt",
  },
  keywords: [
    "full stack developer portfolio",
    "next.js developer portfolio",
    "react developer portfolio",
    "web developer portfolio",
    "software developer portfolio",
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffff00",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="impact-site-verification"
          content="78cae837-d524-4ced-bb12-bd561ad9acb5"
        />
      </head>
      <body className={`${outfit.className}`}>
        <JsonLd data={getOrganizationJsonLd()} />
        <JsonLd data={getWebSiteJsonLd()} />
        <JsonLd data={getPersonJsonLd()} />
        {children}
        <Footer />
      </body>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="2ab06d0a-03d9-4136-82d1-72459f7d5b97"
      />
    </html>
  );
}
