import Image from "next/image";
import Link from "next/link";

interface ApartmentCardProps {
  number: string;
  title: string;
  area: string;
  floor: string;
  rooms: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  lang: "et" | "en";
}

export default function ApartmentCard({
  number,
  title,
  area,
  floor,
  rooms,
  description,
  features,
  imageSrc,
  imageAlt,
  ctaLabel,
  ctaHref,
  lang,
}: ApartmentCardProps) {
  const labels =
    lang === "et"
      ? { area: "Pind", floor: "Korrus", rooms: "Toad" }
      : { area: "Area", floor: "Floor", rooms: "Rooms" };

  return (
    <article className="group bg-white border border-stone-100 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center transition-transform duration-800 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Apartment number badge */}
        <div className="absolute top-5 left-5 bg-stone-950/80 backdrop-blur-sm px-3 py-1.5">
          <span className="label-eyebrow text-stone-300">{number}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Specs row */}
        <div className="flex items-center gap-6 mb-5 pb-5 border-b border-stone-100">
          <div>
            <p className="label-eyebrow text-stone-400 mb-0.5">{labels.area}</p>
            <p className="font-serif text-xl font-light text-stone-900">{area}</p>
          </div>
          <div className="h-6 w-px bg-stone-200" />
          <div>
            <p className="label-eyebrow text-stone-400 mb-0.5">{labels.floor}</p>
            <p className="font-serif text-xl font-light text-stone-900">{floor}</p>
          </div>
          <div className="h-6 w-px bg-stone-200" />
          <div>
            <p className="label-eyebrow text-stone-400 mb-0.5">{labels.rooms}</p>
            <p className="font-serif text-xl font-light text-stone-900">{rooms}</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl font-light text-stone-900 mb-3 leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm font-light text-stone-500 leading-relaxed mb-6">
          {description}
        </p>

        {/* Features */}
        <ul className="flex flex-wrap gap-2 mb-8">
          {features.map((feature, i) => (
            <li
              key={i}
              className="font-sans text-xs tracking-wide text-stone-600 bg-stone-50 border border-stone-100 px-3 py-1"
            >
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={ctaHref}
          className="inline-block font-sans text-xs tracking-widest uppercase text-stone-800 border border-stone-800 hover:bg-stone-950 hover:text-stone-100 px-6 py-3 transition-all duration-400"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
