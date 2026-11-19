import type { Metadata } from "next";
import { About } from "@/components/sections/About";

export const metadata: Metadata = { title: "Sobre mí", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <About asPage />;
}
