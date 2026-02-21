import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "Overview — Raua 22 | Raua area, Tallinn",
  description:
    "An introduction to Raua 22 — a protected heritage building in Raua area, Tallinn. Five exceptional residences where history and contemporary comfort meet.",
  openGraph: {
    title: "Overview — Raua 22",
    description:
      "A protected heritage building in Raua area, Tallinn. Five exceptional residences.",
    locale: "en_GB",
  },
};

export default function OverviewPage() {
  return (
    <>
      <HeroSection
        eyebrow="Overview"
        title="Raua area. History. Made to live in."
        subtitle="Raua 22 is more than a building — it is an experience that begins the moment you step through the door."
        imageSrc="/images/building-exterior.jpeg"
        imageAlt="Raua 22 building facade"
        overlay="dark"
        height="large"
        align="left"
      />

      {/* Positioning statement */}
      <section className="bg-stone-950 py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="label-eyebrow text-stone-500 mb-8">What makes Raua 22 different</p>
            <h2
              className="font-serif font-light text-stone-100 leading-[1.15] mb-8"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
            >
              Not every building outlives its era. Raua 22 has done so — and will continue to.
            </h2>
            <p className="font-sans font-light text-stone-400 leading-[1.85] text-sm lg:text-base">
              A listed building in Raua area's established residential quarter is a testament to enduring value. Architectural character, locational prestige and careful restoration combine to create a living environment that does not age.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 — Location */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="label-eyebrow mb-6">Location</p>
              <h2
                className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
              >
                Raua area — an established address at the heart of Tallinn
              </h2>
              <div className="space-y-5 mb-10">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Raua Street runs through the heart of Raua area — a well-established residential quarter where early twentieth-century architecture lines tree-shaded streets. The neighbourhood developed alongside Tallinn's urban expansion, and its character has remained largely intact: unhurried, leafy and deliberately removed from the city's pace.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Kadriorg Park is within walking distance. Tallinn's Old Town and city centre are reachable in 10 to 15 minutes on foot. Public transport stops and main roads are accessible without the daily environment being affected by traffic noise or crowds.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  The area offers everything that a calm urban life requires — pharmacies, daily shopping, schools and cultural institutions — without imposing the pace of a larger city.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/kadriorg-view.png"
                alt="Raua area and surroundings"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Building */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative aspect-[4/5] overflow-hidden lg:order-first order-last">
              <Image
                src="/images/building-detail.jpeg"
                alt="Raua 22 architectural details"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="label-eyebrow mb-6">The building</p>
              <h2
                className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
              >
                Restored facade, renewed interior infrastructure
              </h2>
              <div className="space-y-5 mb-10">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  The building has undergone a comprehensive restoration in which the original facade, load-bearing structure and architecturally significant interior elements have been preserved in accordance with heritage authority requirements. All materials were selected in keeping with the listed building's status.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  The building is equipped with fully updated technical systems: renewed electrical and plumbing infrastructure, a modern heating system, thermally upgraded windows that retain the original profile, and appropriate ventilation throughout.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Access to the building is secured. Entry is via a keypad-protected door; access to the courtyard is restricted. Privacy is maintained both within the building and outside it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Living */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="label-eyebrow mb-6">Living</p>
            <h2
              className="font-serif font-light text-stone-900 leading-tight mb-7"
              style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
            >
              Five homes, five distinct spatial experiences
            </h2>
            <div className="space-y-5 mb-12">
              <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                Each apartment at Raua 22 has its own character. Ground-floor residences open towards the courtyard — a quiet, private outlook and generous ceiling heights create an uncommon sense of calm in everyday life. Upper-floor apartments offer better light and wider views while retaining the building's period character.
              </p>
              <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                Floor plans have been designed with functionality in mind — generous living rooms, open kitchen layouts, well-separated bedrooms and spacious bathrooms finished with quality natural materials.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-12">
              {[
                { num: "5", label: "Exclusive residences" },
                { num: "89–117", label: "Square metres" },
                { num: "100+", label: "Years of history" },
                { num: "1", label: "Private courtyard" },
              ].map((stat) => (
                <div key={stat.label} className="border-l-2 border-bronze pl-5">
                  <p className="font-serif text-4xl font-light text-stone-900 leading-none mb-1">
                    {stat.num}
                  </p>
                  <p className="font-sans text-xs tracking-wide text-stone-400 uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/en/apartments"
              className="inline-block font-sans text-xs tracking-widest uppercase text-stone-800 border border-stone-300 hover:border-stone-800 px-7 py-3.5 transition-all duration-400"
            >
              View apartments
            </Link>
          </div>
        </div>
      </section>

      {/* CTA stripe */}
      <section className="bg-stone-950 py-20 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2
              className="font-serif font-light text-stone-100 mb-2"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
            >
              Would you like to know more?
            </h2>
            <p className="font-sans font-light text-stone-500 text-sm">
              We arrange private viewings at a time that suits you.
            </p>
          </div>
          <Link
            href="/en/contact"
            className="inline-block font-sans text-xs tracking-widest uppercase text-stone-950 bg-stone-100 hover:bg-white px-10 py-4 transition-all duration-400 whitespace-nowrap"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
