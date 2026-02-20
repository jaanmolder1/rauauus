import Image from "next/image";
import Link from "next/link";

interface ContentSectionProps {
  eyebrow?: string;
  title: string;
  body: string | string[];
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "right" | "left" | "none";
  ctaLabel?: string;
  ctaHref?: string;
  background?: "white" | "cream" | "dark";
  narrow?: boolean;
}

export default function ContentSection({
  eyebrow,
  title,
  body,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  ctaLabel,
  ctaHref,
  background = "white",
  narrow = false,
}: ContentSectionProps) {
  const bgClass =
    background === "cream"
      ? "bg-stone-50"
      : background === "dark"
      ? "bg-stone-950 text-stone-100"
      : "bg-white";

  const isDark = background === "dark";
  const paragraphs = Array.isArray(body) ? body : [body];

  const hasImage = imageSrc && imagePosition !== "none";

  return (
    <section className={`${bgClass} py-24 md:py-32`}>
      <div className={`max-w-screen-xl mx-auto px-6 lg:px-12`}>
        {hasImage ? (
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${
              imagePosition === "left" ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Text */}
            <div className={narrow ? "lg:px-8" : ""}>
              {eyebrow && (
                <p className="label-eyebrow mb-5">{eyebrow}</p>
              )}
              <h2
                className={`font-serif font-light leading-tight mb-8 ${
                  isDark ? "text-stone-100" : "text-stone-900"
                }`}
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                {title}
              </h2>
              <div className="space-y-5">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`font-sans font-light leading-[1.85] ${
                      isDark ? "text-stone-400" : "text-stone-600"
                    }`}
                    style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}
                  >
                    {p}
                  </p>
                ))}
              </div>
              {ctaLabel && ctaHref && (
                <Link
                  href={ctaHref}
                  className={`inline-block mt-10 font-sans text-xs tracking-widest uppercase border px-7 py-3.5 transition-all duration-400 ${
                    isDark
                      ? "text-stone-200 border-stone-600 hover:border-stone-300 hover:text-white"
                      : "text-stone-800 border-stone-400 hover:border-stone-800 hover:text-stone-950"
                  }`}
                >
                  {ctaLabel}
                </Link>
              )}
            </div>

            {/* Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt || title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        ) : (
          /* No image — centered or narrow text layout */
          <div className={`${narrow ? "max-w-2xl mx-auto" : "max-w-3xl"}`}>
            {eyebrow && (
              <p className="label-eyebrow mb-5">{eyebrow}</p>
            )}
            <h2
              className={`font-serif font-light leading-tight mb-8 ${
                isDark ? "text-stone-100" : "text-stone-900"
              }`}
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              {title}
            </h2>
            <div className="space-y-5">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`font-sans font-light leading-[1.85] ${
                    isDark ? "text-stone-400" : "text-stone-600"
                  }`}
                  style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}
                >
                  {p}
                </p>
              ))}
            </div>
            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className={`inline-block mt-10 font-sans text-xs tracking-widest uppercase border px-7 py-3.5 transition-all duration-400 ${
                  isDark
                    ? "text-stone-200 border-stone-600 hover:border-stone-300 hover:text-white"
                    : "text-stone-800 border-stone-400 hover:border-stone-800 hover:text-stone-950"
                }`}
              >
                {ctaLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
