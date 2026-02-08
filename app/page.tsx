import type { Metadata } from "next";
import { Portfolio } from "@/components/main/portfolio";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  return <Portfolio />;
}
