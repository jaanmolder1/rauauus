import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt: string;
  overlay?: "dark" | "medium" | "light";
  height?: "full" | "large" | "medium";
  align?: "center" | "left" | "bottom-left";
}

export default function HeroSection({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  overlay = "dark",
  height = "full",
  align = "center",
}: HeroSectionProps) {
  const heightClass =
    height === "full"
      ? "min-h-screen"
      : height === "large"
      ? "min-h-[85vh]"
      : "min-h-[65vh]";

  const overlayClass =
    overlay === "dark"
      ? "bg-stone-950/65"
      : overlay === "medium"
      ? "bg-stone-950/45"
      : "bg-stone-950/25";

  const alignClass =
    align === "center"
      ? "items-center text-center"
      : align === "left"
      ? "items-center text-left"
      : "items-end text-left pb-20 md:pb-28";

  return (
    <section className={`relative ${heightClass} flex ${alignClass} overflow-hidden`}>
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        quality={90}
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClass}`} />

      {/* Gradient bottom */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-stone-950/60 to-transparent" />

      {/* Content */}
      <div className={`relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-28 md:pt-36 pb-20 md:pb-28 ${align === "center" ? "flex flex-col items-center" : ""}`}>
        {eyebrow && (
          <p className="label-eyebrow text-stone-300/80 mb-6">{eyebrow}</p>
        )}

        <h1 className="font-serif font-light text-stone-50 leading-[1.08] mb-6 max-w-4xl"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
          {title}
        </h1>

        {subtitle && (
          <p className="font-sans font-light text-stone-300 leading-relaxed mb-10 max-w-xl"
            style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}>
            {subtitle}
          </p>
        )}

        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-block font-sans text-xs tracking-widest uppercase text-stone-950 bg-stone-100 hover:bg-white px-8 py-4 transition-all duration-400 hover:tracking-ultra-wide"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
