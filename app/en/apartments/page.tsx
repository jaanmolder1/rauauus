import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import { apartmentPriceById } from "@/lib/apartmentData";

function fmtPrice(n: number) {
  return new Intl.NumberFormat("et-EE", { maximumFractionDigits: 0 }).format(n) + " €";
}

export const metadata: Metadata = {
  title: "Apartments — Raua 22 | Raua area, Tallinn",
  description:
    "Five exclusive apartments at Raua 22, Raua area — from 89 to 117 square metres, with high ceilings, restored original floors and modern comfort in a listed heritage building.",
  openGraph: {
    title: "Apartments — Raua 22",
    description: "Five exclusive residences from 89–117 m² in Raua area's listed heritage building.",
    locale: "en_GB",
  },
};

const apartments = [
  {
    id: "apt-1",
    number: "Apartment 1",
    title: "Courtyard residence — generous four-room",
    area: "113 m²",
    floor: "Ground floor",
    rooms: "4 rooms",
    description:
      "The largest ground-floor apartment opens onto the private courtyard. Three independent bedrooms, a generous kitchen-living room (35.7 m²) and two walk-in wardrobes provide space for every daily need. Restored timber floors and high ceilings preserve the building's original dignity.",
    features: [
      "3 bedrooms",
      "2 walk-in wardrobes",
      "Kitchen-living room 35.7 m²",
      "Private courtyard view",
      "Restored timber floors",
    ],
    imageSrc: "/images/apartment-interior.jpeg",
    imageAlt: "Apartment 1 living room",
  },
  {
    id: "apt-2",
    number: "Apartment 2",
    title: "Study apartment — work and home combined",
    area: "99 m²",
    floor: "Ground floor",
    rooms: "3 rooms + study",
    description:
      "A compact and well-considered ground-floor apartment with a separate study for working from home. Two bedrooms, a generous kitchen-living room (32.1 m²) and a walk-in wardrobe form a coherent whole within an original listed setting.",
    features: [
      "2 bedrooms",
      "Separate study 9.3 m²",
      "Kitchen-living room 32.1 m²",
      "Walk-in wardrobe",
      "Restored timber floors",
    ],
    imageSrc: "/images/apartment-living.jpeg",
    imageAlt: "Apartment 2 living room",
  },
  {
    id: "apt-3",
    number: "Apartment 3",
    title: "Balcony apartment — views over the greenery",
    area: "100 m²",
    floor: "Second floor",
    rooms: "3 rooms",
    description:
      "A second-floor apartment with a 23 m² balcony — a rare outdoor space in the heart of the city. Two bedrooms, a generous kitchen-living room (34.3 m²) and two walk-in wardrobes are arranged with ease. High ceilings and the ornamental period stairwell underscore the building's character.",
    features: [
      "Balcony 23 m²",
      "2 bedrooms",
      "Kitchen-living room 34.3 m²",
      "2 walk-in wardrobes",
      "High ceilings",
    ],
    imageSrc: "/images/building-exterior.jpeg",
    imageAlt: "Apartment 3 balcony",
  },
  {
    id: "apt-4",
    number: "Apartment 4",
    title: "Dual-balcony apartment — light and private",
    area: "89 m²",
    floor: "Second floor",
    rooms: "3 rooms",
    description:
      "Two balconies (19.5 m² and 12.9 m², over 32 m² in total) give this second-floor apartment exceptional light and outdoor living. Two bedrooms and a generous kitchen-living room (33.4 m²) are thoughtfully arranged. Courtyard parking adds everyday convenience.",
    features: [
      "2 balconies (32 m² total)",
      "2 bedrooms",
      "Kitchen-living room 33.4 m²",
      "Walk-in wardrobe",
      "Courtyard parking",
    ],
    imageSrc: "/images/building-detail.jpeg",
    imageAlt: "Apartment 4 balcony",
  },
  {
    id: "apt-5",
    number: "Apartment 5",
    title: "Family residence — top floor with terrace",
    area: "117 m²",
    floor: "Third floor",
    rooms: "4 rooms",
    description:
      "The largest apartment in the building offers a family both space and privacy. A generous terrace (29.7 m²) with views over the neighbourhood's tree canopy, three independent bedrooms, two bathrooms and a kitchen-living room (38.1 m²) — an unusual combination in an urban setting.",
    features: [
      "Terrace 29.7 m²",
      "3 bedrooms",
      "2 bathrooms",
      "Kitchen-living room 38.1 m²",
      "Walk-in wardrobe",
    ],
    imageSrc: "/images/raua22-render.png",
    imageAlt: "Apartment 5 — top-floor residence with terrace",
  },
];

export default function ApartmentsPage() {
  return (
    <>
      <HeroSection
        eyebrow="Apartments"
        title="Five homes. Each distinct."
        subtitle="Every residence at Raua 22 has its own character, its own outlook and its own story. The range ensures that each buyer finds a home suited to their own rhythm of life."
        imageSrc="/images/apartment-interior.jpeg"
        imageAlt="Raua 22 apartment interior"
        overlay="dark"
        height="large"
        align="left"
      />

      {/* Intro stats */}
      <section className="bg-stone-950 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-800/30">
            {[
              { num: "5", label: "Exclusive residences" },
              { num: "89–117 m²", label: "Range of sizes" },
              { num: "3–4", label: "Rooms available" },
            ].map((stat) => (
              <div key={stat.label} className="bg-stone-900/30 p-10 lg:p-12">
                <p className="font-serif text-5xl font-light text-stone-100 mb-3">{stat.num}</p>
                <p className="label-eyebrow text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apartment listings */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="label-eyebrow mb-12">Available apartments</p>
          <div className="flex flex-col gap-0">
            {apartments.map((apt, index) => (
              <article
                key={apt.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border border-stone-200 ${
                  index > 0 ? "border-t-0" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative aspect-4/3 lg:aspect-auto overflow-hidden ${
                    index % 2 === 1 ? "lg:order-last" : ""
                  }`}
                >
                  <Image
                    src={apt.imageSrc}
                    alt={apt.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-5 left-5 bg-stone-950/80 backdrop-blur-sm px-3 py-1.5">
                    <span className="label-eyebrow text-stone-300">{apt.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white p-10 lg:p-14 flex flex-col justify-center">
                  {/* Specs */}
                  <div className="flex items-center gap-6 mb-7 pb-7 border-b border-stone-100 flex-wrap">
                    <div>
                      <p className="label-eyebrow text-stone-400 mb-1">Area</p>
                      <p className="font-serif text-2xl font-light text-stone-900">{apt.area}</p>
                    </div>
                    <div className="h-8 w-px bg-stone-200" />
                    <div>
                      <p className="label-eyebrow text-stone-400 mb-1">Floor</p>
                      <p className="font-serif text-2xl font-light text-stone-900">{apt.floor}</p>
                    </div>
                    <div className="h-8 w-px bg-stone-200" />
                    <div>
                      <p className="label-eyebrow text-stone-400 mb-1">Rooms</p>
                      <p className="font-serif text-2xl font-light text-stone-900">{apt.rooms}</p>
                    </div>
                    <div className="h-8 w-px bg-stone-200" />
                    <div>
                      <p className="label-eyebrow text-stone-400 mb-1">Price</p>
                      <p className="font-serif text-2xl font-light text-stone-900">{fmtPrice(apartmentPriceById[apt.id])}</p>
                    </div>
                  </div>

                  {/* Title */}
                  <h2
                    className="font-serif font-light text-stone-900 leading-snug mb-5"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                  >
                    {apt.title}
                  </h2>

                  {/* Description */}
                  <p className="font-sans font-light text-stone-500 leading-relaxed text-sm lg:text-base mb-8">
                    {apt.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {apt.features.map((feature) => (
                      <span
                        key={feature}
                        className="font-sans text-xs tracking-wide text-stone-600 bg-stone-50 border border-stone-100 px-3 py-1"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href="/en/contact"
                    className="inline-block font-sans text-xs tracking-widest uppercase text-stone-800 border border-stone-800 hover:bg-stone-950 hover:text-stone-100 px-7 py-3.5 transition-all duration-400 self-start"
                  >
                    Enquire about this apartment
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage elements section */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="label-eyebrow mb-6">Heritage elements</p>
              <h2
                className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
              >
                Preserved details that do not age
              </h2>
              <div className="space-y-5 mb-10">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  In every apartment, the original timber floors have been preserved and restored. A conservation method has been applied that reinstates the original tone and texture while extending the service life by decades.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  High ceilings (3.0–3.4 m) give each apartment a proportional sense of scale. In apartments where the original plaster cornice had survived, it has been restored. Windows have not been replaced with plastic — the limestone and timber frames retain the original profile, but their thermal performance has been modernised.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "Restored original timber floors",
                  "High ceilings (3.0–3.4 m)",
                  "Original window positions and proportions",
                  "Restoration in accordance with heritage authority requirements",
                  "Contemporary ventilation and heating systems",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-bronze shrink-0" />
                    <p className="font-sans text-sm font-light text-stone-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-3/4 overflow-hidden">
              <Image
                src="/images/building-detail.jpeg"
                alt="Heritage details at Raua 22"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Viewing CTA */}
      <section className="bg-stone-950 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="label-eyebrow text-stone-500 mb-3">Private viewing</p>
            <h2
              className="font-serif font-light text-stone-100"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              Would you like to see an apartment in person?
            </h2>
          </div>
          <Link
            href="/en/contact"
            className="inline-block font-sans text-xs tracking-widest uppercase text-stone-950 bg-stone-100 hover:bg-white px-10 py-4 transition-all duration-400 whitespace-nowrap"
          >
            Arrange a viewing
          </Link>
        </div>
      </section>
    </>
  );
}
