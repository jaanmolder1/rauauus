import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import { jsonLdProperty, jsonLdOrganization } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Raua 22 | Kadriorg, Tallinn",
  description:
    "Five exclusive residences in a protected heritage building at the heart of Kadriorg. Architectural legacy, restored to contemporary standards of living.",
  keywords: [
    "Kadriorg apartments",
    "heritage building Tallinn",
    "exclusive real estate Estonia",
    "listed building apartment Tallinn",
    "Kadriorg investment property",
  ],
  openGraph: {
    title: "Raua 22 — Kadriorg, Tallinn",
    description:
      "Five exclusive residences in a protected heritage building at the heart of Kadriorg.",
    locale: "en_GB",
  },
};

export default function EnHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLdOrganization, jsonLdProperty]),
        }}
      />

      {/* Hero */}
      <HeroSection
        eyebrow="Kadriorg · Tallinn"
        title="A home that is more than a place to live"
        subtitle="Five exclusive residences in a protected heritage building. Architectural legacy, restored for contemporary life."
        ctaLabel="Discover the building"
        ctaHref="/en/overview"
        imageSrc="/images/building-exterior.jpeg"
        imageAlt="Raua 22 building exterior — Kadriorg, Tallinn"
        overlay="dark"
        height="full"
        align="center"
      />

      {/* Intro statement */}
      <section className="bg-stone-950 py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="label-eyebrow text-stone-500 mb-8">Raua 22</p>
            <h2
              className="font-serif font-light text-stone-100 leading-[1.15] mb-8"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
            >
              Kadriorg is Tallinn's most distinguished residential quarter. Raua 22 is its embodiment — a building that speaks of history, yet is made for the future.
            </h2>
            <p
              className="font-sans font-light text-stone-400 leading-[1.85]"
              style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}
            >
              Five carefully restored residences await those who value architectural distinction, a quiet environment and the enduring value of lasting property.
            </p>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <p className="label-eyebrow mb-12">Why Raua 22</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200">
            {[
              {
                num: "01",
                title: "Heritage protection",
                body: "A nationally listed architectural monument. Every element of the restoration was carried out in full accordance with heritage authority requirements.",
              },
              {
                num: "02",
                title: "Kadriorg",
                body: "A home in one of Tallinn's most prestigious neighbourhoods — within walking distance of Kadriorg Park and the city centre.",
              },
              {
                num: "03",
                title: "Five residences",
                body: "Only five exclusive apartments. Privacy, quiet, and a community where neighbours are known by name.",
              },
              {
                num: "04",
                title: "Courtyard parking",
                body: "Private parking within the courtyard. A calm and secure living environment with every comfort.",
              },
            ].map((item) => (
              <div key={item.num} className="bg-white p-10 flex flex-col gap-4">
                <span className="label-eyebrow text-stone-400">{item.num}</span>
                <h3 className="font-serif text-xl font-light text-stone-900">{item.title}</h3>
                <p className="font-sans text-sm font-light text-stone-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image + text split */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/building-courtyard.jpeg"
                alt="Raua 22 courtyard"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="label-eyebrow mb-6">Architectural heritage</p>
              <h2
                className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
              >
                Preserved dignity, in harmony with contemporary comfort
              </h2>
              <div className="space-y-5 mb-10">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Raua 22 dates from the early twentieth century, when Kadriorg established itself as Tallinn's premier residential quarter. The original architecture has been carefully preserved — ornamental details, high ceilings, generous window proportions and timber elements have been restored using period-appropriate materials and techniques.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  At the same time, each apartment has become a contemporary home, without compromise on modern comfort. Kitchen appliances, heating systems, electrical installations and acoustic insulation all meet the standards of new construction.
                </p>
              </div>
              <Link
                href="/en/history"
                className="inline-block font-sans text-xs tracking-widest uppercase text-stone-800 border border-stone-300 hover:border-stone-800 px-7 py-3.5 transition-all duration-400"
              >
                Read the history
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Apartments teaser */}
      <section className="bg-stone-950 py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <p className="label-eyebrow text-stone-500 mb-5">Apartments</p>
              <h2
                className="font-serif font-light text-stone-100 leading-tight"
                style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
              >
                Five distinct homes
              </h2>
            </div>
            <Link
              href="/en/apartments"
              className="inline-block font-sans text-xs tracking-widest uppercase text-stone-300 border border-stone-700 hover:border-stone-300 px-7 py-3.5 transition-all duration-400 whitespace-nowrap"
            >
              All apartments
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-800/30">
            {[
              { label: "65 – 90 m²", desc: "One and two-bedroom compact residences on the first floor" },
              { label: "95 – 115 m²", desc: "Generous three-room apartments with high ceilings" },
              { label: "120 – 145 m²", desc: "Family residences with large kitchen and private terrace" },
            ].map((apt, i) => (
              <div key={i} className="bg-stone-900/50 p-10 border-t border-stone-800/50">
                <p className="font-serif text-3xl font-light text-stone-100 mb-3">{apt.label}</p>
                <p className="font-sans text-sm font-light text-stone-500 leading-relaxed">{apt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-40 overflow-hidden">
        <Image
          src="/images/kadriorg-view.png"
          alt="Kadriorg park view"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-stone-950/60" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 text-center">
          <p className="label-eyebrow text-stone-300/80 mb-6">Private viewing</p>
          <h2
            className="font-serif font-light text-stone-50 mb-8"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            We invite you to visit
          </h2>
          <p className="font-sans font-light text-stone-300 leading-relaxed mb-10 max-w-lg mx-auto text-sm lg:text-base">
            We arrange discreet private viewings at a time and pace that suits you. Contact us and we will find a suitable moment.
          </p>
          <Link
            href="/en/contact"
            className="inline-block font-sans text-xs tracking-widest uppercase text-stone-950 bg-stone-100 hover:bg-white px-10 py-4 transition-all duration-400"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
