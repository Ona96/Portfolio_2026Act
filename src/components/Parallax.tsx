"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface ParallaxProps {
  /** 0 = fijo · 1 = acompaña al scroll. Típicamente 0.1–0.35. */
  speed?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Capa decorativa que se desplaza con el scroll a velocidad propia:
 * da profundidad al Hero sin tocar el layout (solo transform).
 * Solo actualiza mientras el Hero está cerca del viewport, y no
 * hace nada con prefers-reduced-motion.
 */
export function Parallax({ speed = 0.2, className = "", children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y > window.innerHeight * 1.5) return; // el Hero ya salió de pantalla
        el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}
