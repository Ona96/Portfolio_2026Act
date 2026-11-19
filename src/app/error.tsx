"use client";

import { RefreshCw } from "lucide-react";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">Error</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Algo salió mal</h1>
      <p className="mt-3 text-mute">No se pudo cargar esta página. Probá de nuevo en unos segundos.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink shadow-card transition-all hover:brightness-110"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" /> Reintentar
      </button>
    </div>
  );
}
