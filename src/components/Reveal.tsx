"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type Variant = "up" | "left" | "right" | "blur" | "scale";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Retardo en ms para escalonar apariciones dentro de una grilla. */
  delay?: number;
  /** Cómo entra el contenido al hacer scroll (estilos en globals.css). */
  variant?: Variant;
}

/**
 * Contenedor de aparición al hacer scroll (IntersectionObserver + CSS).
 * Sin JS el contenido se ve normalmente (los estados iniciales solo
 * existen con html.js); con prefers-reduced-motion se muestra sin
 * animación. Las variantes se declaran con data-variant y se estilan
 * en globals.css: este componente solo decide el "cuándo".
 */
export function Reveal({ children, className = "", delay = 0, variant = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("revealed");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("revealed");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -24px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-variant={variant}
      className={`reveal h-full ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
