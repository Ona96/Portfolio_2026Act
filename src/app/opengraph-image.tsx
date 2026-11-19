import { ImageResponse } from "next/og";
import { portfolioConfig } from "@/config/portfolio";

export const alt = `${portfolioConfig.owner.name} · Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { owner } = portfolioConfig;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0a0618",
          color: "#ebe9ff",
        }}
      >
        {/* Sol synthwave asomando en el fondo */}
        <div
          style={{
            position: "absolute",
            left: 660,
            top: 250,
            width: 340,
            height: 340,
            borderRadius: 9999,
            backgroundImage: "linear-gradient(to bottom, rgba(100,224,255,0.45), rgba(177,106,255,0.6))",
            display: "flex",
          }}
        />
        {/* Grilla tenue en perspectiva */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 280,
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(177,106,255,0.25) 0 1px, transparent 1px 60px), repeating-linear-gradient(to bottom, rgba(177,106,255,0.25) 0 1px, transparent 1px 40px)",
            display: "flex",
          }}
        />
        <div style={{ fontSize: 28, color: "#b16aff", display: "flex" }}>
          {owner.githubUser.toLowerCase()}/portfolio
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 24, display: "flex" }}>
          {owner.name}
          <span style={{ color: "#64e0ff" }}>.</span>
        </div>
        <div style={{ fontSize: 36, color: "#9890c8", marginTop: 16, display: "flex" }}>{owner.role}</div>
      </div>
    ),
    size,
  );
}
