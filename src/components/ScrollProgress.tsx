"use client";

import { useEffect, useState } from "react";

/**
 * Barra de progreso de scroll: fina, arriba de todo, con el degradado
 * neón de la identidad. Se actualiza con requestAnimationFrame y
 * listeners pasivos; solo toca transform (compositor, sin reflow).
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 lg:hidden">
      <div
        className="h-full origin-left bg-gradient-to-r from-accent to-accent-2"
        style={{ transform: `scaleX(${progress})`, boxShadow: "0 0 10px rgb(var(--accent) / 0.7)" }}
      />
    </div>
  );
}
