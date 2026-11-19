import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Technologies } from "@/components/sections/Technologies";
import { StatsStrip } from "@/components/StatsStrip";
import { getPortfolioData } from "@/lib/github";

export const revalidate = 1800; // mantener igual a portfolioConfig.repositories.revalidateSeconds

export default async function HomePage() {
  const data = await getPortfolioData();
  return (
    <>
      <Hero data={data} />
      <StatsStrip data={data} />
      <FeaturedProjects data={data} />
      <Technologies data={data} />
      <About />
      <Contact />
    </>
  );
}
