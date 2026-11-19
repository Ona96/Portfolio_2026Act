import type { MetadataRoute } from "next";
import { portfolioConfig } from "@/config/portfolio";
import { getPortfolioData } from "@/lib/github";

export const revalidate = 1800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = portfolioConfig.site.url.replace(/\/$/, "");
  const data = await getPortfolioData();
  const pages = ["", "/projects", "/about", "/contact"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const projects = data.projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  return [...pages, ...projects];
}
