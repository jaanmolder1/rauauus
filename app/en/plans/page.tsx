import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import FloorPlanViewer from "@/components/FloorPlanViewer";
import FinancingSection from "@/components/FinancingSection";

export const metadata: Metadata = {
  title: "Prices & Plans — Raua 22 | Raua area, Tallinn",
  description:
    "Five exclusive residences at Raua 22 in Raua area — from 89 to 117 square metres, with high ceilings, restored original floors and modern comfort in a listed heritage building.",
  openGraph: {
    title: "Prices & Plans — Raua 22",
    description: "Five exclusive residences from 89–117 m² in Raua area's listed heritage building.",
    locale: "en_GB",
  },
};

function fmtPrice(n: number) {
  return new Intl.NumberFormat("et-EE", { maximumFractionDigits: 0 }).format(n) + " €";
}

const apartments = [
  {
    id: "apt-1",
    number: "Apartment 1",
    title: "Courtyard residence — generous four-room",
    area: "113 m²",
    floor: "Ground floor",
    rooms: "4 rooms",
    price: 475_000,
  },
  {
    id: "apt-2",
    number: "Apartment 2",
    title: "Study apartment — work and home combined",
    area: "99 m²",
    floor: "Ground floor",
    rooms: "3 rooms + study",
    price: 415_000,
  },
  {
    id: "apt-3",
    number: "Apartment 3",
    title: "Balcony apartment — views over the greenery",
    area: "100 m²",
    floor: "Second floor",
    rooms: "3 rooms",
    price: 445_000,
  },
  {
    id: "apt-4",
    number: "Apartment 4",
    title: "Dual-balcony apartment — light and private",
    area: "89 m²",
    floor: "Second floor",
    rooms: "3 rooms",
    price: 380_000,
  },
  {
    id: "apt-5",
    number: "Apartment 5",
    title: "Family residence — top floor with terrace",
    area: "117 m²",
    floor: "Third floor",
    rooms: "4 rooms",
    price: 595_000,
  },
];

export default function PlansPage() {
  return (
    <>
      <HeroSection
        eyebrow="Prices & Plans"
        title="Five homes. Each distinct."
        subtitle="Explore the interactive floor plans and find the residence that suits you best at Raua 22."
        imageSrc="/images/apartment-interior.jpeg"
        imageAlt="Raua 22 apartment interior"
        overlay="dark"
        height="large"
        align="left"
      />

      {/* Stats bar */}
      <section className="bg-stone-950 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-800/30">
            {[
              { num: "5", label: "Exclusive residences" },
              { num: "89–117 m²", label: "Range of sizes" },
              { num: "1–3", label: "Floor numbers" },
              { num: "3.0–3.4 m", label: "Ceiling height" },
            ].map((stat) => (
              <div key={stat.label} className="bg-stone-900/30 p-8 lg:p-10">
                <p className="font-serif text-3xl lg:text-4xl font-light text-stone-100 mb-2">{stat.num}</p>
                <p className="label-eyebrow text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive floor plan */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <p className="label-eyebrow text-stone-500 mb-5">Floor plan</p>
            <h2
              className="font-serif font-light text-stone-900 leading-tight"
              style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
            >
              Select a floor, explore the plan
            </h2>
          </div>
          <FloorPlanViewer />
        </div>
      </section>

      {/* Apartment price list */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="label-eyebrow mb-12">Apartment prices</p>

          <div className="border border-stone-200">
            {/* Header row */}
            <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] gap-0 border-b border-stone-200 bg-stone-50">
              {["Apartment", "Area", "Floor", "Rooms", "Price", ""].map((h) => (
                <div key={h} className="px-6 py-4">
                  <span className="label-eyebrow text-stone-400">{h}</span>
                </div>
              ))}
            </div>

            {/* Apartment rows */}
            {apartments.map((apt, i) => (
              <div
                key={apt.id}
                className={`grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] gap-0 ${
                  i < apartments.length - 1 ? "border-b border-stone-100" : ""
                } hover:bg-stone-50 transition-colors duration-200`}
              >
                {/* Number + title */}
                <div className="px-6 py-6 md:py-5 flex flex-col justify-center">
                  <span className="label-eyebrow text-stone-400 mb-1">{apt.number}</span>
                  <span
                    className="font-serif font-light text-stone-900 leading-snug"
                    style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)" }}
                  >
                    {apt.title}
                  </span>
                </div>

                {/* Area */}
                <div className="px-6 py-2 md:py-5 flex flex-col justify-center">
                  <span className="label-eyebrow text-stone-400 mb-1 md:hidden">Area</span>
                  <span className="font-serif text-xl font-light text-stone-900">{apt.area}</span>
                </div>

                {/* Floor */}
                <div className="px-6 py-2 md:py-5 flex flex-col justify-center">
                  <span className="label-eyebrow text-stone-400 mb-1 md:hidden">Floor</span>
                  <span className="font-sans text-sm font-light text-stone-600">{apt.floor}</span>
                </div>

                {/* Rooms */}
                <div className="px-6 py-2 md:py-5 flex flex-col justify-center">
                  <span className="label-eyebrow text-stone-400 mb-1 md:hidden">Rooms</span>
                  <span className="font-sans text-sm font-light text-stone-600">{apt.rooms}</span>
                </div>

                {/* Price */}
                <div className="px-6 py-2 md:py-5 flex flex-col justify-center">
                  <span className="label-eyebrow text-stone-400 mb-1 md:hidden">Price</span>
                  <span className="font-serif text-xl font-light text-stone-900">{fmtPrice(apt.price)}</span>
                </div>

                {/* CTA */}
                <div className="px-6 py-4 md:py-5 flex items-center">
                  <Link
                    href="/en/contact"
                    className="inline-block font-sans text-xs tracking-widest uppercase text-stone-800 border border-stone-300 hover:border-stone-800 px-5 py-2.5 transition-all duration-300 whitespace-nowrap"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="font-sans text-xs text-stone-400 mt-5 leading-relaxed">
            Prices are indicative and do not include notary fees, state duties or other transaction costs.
            Please contact us for detailed information.
          </p>
        </div>
      </section>

      {/* Financing section */}
      <FinancingSection lang="en" />

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
