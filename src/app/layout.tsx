import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { IdleEffects } from "@/components/IdleEffects";
import { ScrollProgress } from "@/components/ScrollProgress";
import { portfolioConfig } from "@/config/portfolio";
import "./globals.css";

const { owner, site } = portfolioConfig;

/**
 * Script de tema: corre como primer hijo de <body>, antes de pintar el
 * contenido, para evitar parpadeos. Aplica la preferencia guardada o el
 * tema del sistema, y marca .js para las animaciones de scroll.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var e=document.documentElement;e.classList.add("js");e.classList.add(d?"dark":"light");}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${owner.name} · ${owner.role}`, template: `%s · ${owner.name}` },
  description: site.description,
  authors: [{ name: owner.name, url: `https://github.com/${owner.githubUser}` }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: `${owner.name} · Portfolio`,
    title: `${owner.name} · ${owner.role}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: `${owner.name} · ${owner.role}`, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0618" },
    { media: "(prefers-color-scheme: light)", color: "#f6f4ff" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink"
        >
          Saltar al contenido
        </a>
        <ScrollProgress />
        <IdleEffects />
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
