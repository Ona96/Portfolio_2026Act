import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  /** Etiqueta técnica opcional sobre el título (ej: "01 · Proyectos"). */
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}

export function Section({ id, eyebrow, title, description, children, className, as: Heading = "h2" }: SectionProps) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20", className)}>
      <div className="mb-10 max-w-2xl">
        {eyebrow && (
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        )}
        <Heading className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</Heading>
        {description && <p className="mt-3 leading-relaxed text-mute">{description}</p>}
      </div>
      {children}
    </section>
  );
}
