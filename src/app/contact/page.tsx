import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = { title: "Contacto", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <Contact asPage />;
}
