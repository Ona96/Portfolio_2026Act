export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : dateFormatter.format(date);
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  HTML: "#e34c26",
  CSS: "#7b5fc4",
  Shell: "#89e051",
  PowerShell: "#3b78b8",
  Java: "#b07219",
  "C#": "#68a63c",
  C: "#8a8a8a",
  "C++": "#f34b7d",
  Go: "#00add8",
  Rust: "#dea584",
  PHP: "#4f5d95",
  Ruby: "#cc342d",
  Kotlin: "#a97bff",
  Dockerfile: "#384d54",
  Lua: "#3c3c9e",
};

export function languageColor(name: string | null): string {
  return (name && LANGUAGE_COLORS[name]) || "#6b7686";
}
