export function ProjectsSkeleton() {
  return (
    <div role="status" aria-label="Cargando proyectos" className="overflow-hidden rounded-xl border border-line/70">
      <ul className="divide-y divide-line/60">
        {Array.from({ length: 5 }, (_, i) => (
          <li key={i} className="flex items-center gap-6 px-5 py-5">
            <div className="h-7 w-7 animate-pulse rounded bg-raised" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 animate-pulse rounded bg-raised" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-raised" />
            </div>
            <div className="hidden h-16 w-24 animate-pulse rounded-lg bg-raised sm:block" />
          </li>
        ))}
      </ul>
    </div>
  );
}
