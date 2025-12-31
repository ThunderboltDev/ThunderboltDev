import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { Footer } from "@/components/main/footer";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "⚡ Thunderbolt",
  description:
    "I am a self taught web developer building beautiful websites one line of code at a time.",
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
