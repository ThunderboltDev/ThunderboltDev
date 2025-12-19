import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Script from "next/script";

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
      <body className={`${outfit.className}`}>{children}</body>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="2ab06d0a-03d9-4136-82d1-72459f7d5b97"
      />
    </html>
  );
}
