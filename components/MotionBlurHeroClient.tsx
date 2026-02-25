"use client";

import dynamic from "next/dynamic";
import type { HeroSlide } from "./MotionBlurHero";

const MotionBlurHero = dynamic(() => import("./MotionBlurHero"), {
  ssr: false,
  loading: () => (
    <div
      className="relative h-screen bg-stone-950"
      style={{
        backgroundImage: "url(/images/building-exterior.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-stone-950/50" />
    </div>
  ),
});

export default function MotionBlurHeroClient({
  slides,
  autoPlayMs,
  ctaLabel,
  ctaHref,
}: {
  slides: HeroSlide[];
  autoPlayMs?: number;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return <MotionBlurHero slides={slides} autoPlayMs={autoPlayMs} ctaLabel={ctaLabel} ctaHref={ctaHref} />;
}
