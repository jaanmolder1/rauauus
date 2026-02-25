import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import FloorPlanViewer from "@/components/FloorPlanViewer";
import FinancingSection from "@/components/FinancingSection";
import { apartments } from "@/lib/apartmentData";

export const metadata: Metadata = {
  title: "Hinnad ja plaanid — Raua 22 | Raua asum, Tallinn",
  description:
    "Raua 22 viis eksklusiivset korterit Raua asumis — 89 kuni 117 ruutmeetrit, kõrged laed, algupärased põrandad ja kaasaegsed mugavused muinsuskaitsealuses hoones.",
  openGraph: {
    title: "Hinnad ja plaanid — Raua 22",
    description: "Viis eksklusiivset korterit 89–117 m² Raua asumi muinsuskaitsealuses hoones.",
    locale: "et_EE",
  },
};

function fmtPrice(n: number) {
  return new Intl.NumberFormat("et-EE", { maximumFractionDigits: 0 }).format(n) + " €";
}

export default function PlaanidPage() {
  return (
    <>
      <HeroSection
        eyebrow="Hinnad ja plaanid"
        title="Korruseplaanid ja hinnad."
        subtitle="Uuri korterite plaane, võrdle pindasid ja leia sobiv kodu. Kõik, mida vajad otsuse tegemiseks."
        imageSrc="/images/building-exterior.jpeg"
        imageAlt="Raua 22 hoone välivaade"
        overlay="dark"
        height="large"
        align="left"
      />

      {/* Stats bar */}
      <section className="bg-stone-950 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-800/30">
            {[
              { num: "5", label: "Eksklusiivset korterit" },
              { num: "89–117 m²", label: "Pindade vahemik" },
              { num: "1–3", label: "Korrusnumbrid" },
              { num: "3,0–3,4 m", label: "Lae kõrgus" },
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
            <p className="label-eyebrow text-stone-500 mb-5">Korrusplaan</p>
            <h2
              className="font-serif font-light text-stone-900 leading-tight"
              style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
            >
              Vali korrus, uuri plaani
            </h2>
          </div>
          <FloorPlanViewer />
        </div>
      </section>

      {/* Apartment price list */}
      <section className="bg-white pt-24 pb-4 md:pt-32 md:pb-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="label-eyebrow mb-5">Korterite hinnad</p>
          <h2
            className="font-serif font-light text-stone-900 leading-tight mb-12"
            style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
          >
            Korterid
          </h2>

          <div className="border border-stone-200">
            {/* Header row */}
            <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] gap-0 border-b border-stone-200 bg-stone-50">
              {["Korter", "Pind", "Korrus", "Toad", "Hind", ""].map((h) => (
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
                  <span className="label-eyebrow text-stone-400 mb-1 md:hidden">Pind</span>
                  <span className="font-serif text-xl font-light text-stone-900">{apt.area}</span>
                </div>

                {/* Floor */}
                <div className="px-6 py-2 md:py-5 flex flex-col justify-center">
                  <span className="label-eyebrow text-stone-400 mb-1 md:hidden">Korrus</span>
                  <span className="font-sans text-sm font-light text-stone-600">{apt.floor}</span>
                </div>

                {/* Rooms */}
                <div className="px-6 py-2 md:py-5 flex flex-col justify-center">
                  <span className="label-eyebrow text-stone-400 mb-1 md:hidden">Toad</span>
                  <span className="font-sans text-sm font-light text-stone-600">{apt.rooms}</span>
                </div>

                {/* Price */}
                <div className="px-6 py-2 md:py-5 flex flex-col justify-center">
                  <span className="label-eyebrow text-stone-400 mb-1 md:hidden">Hind</span>
                  <span className="font-serif text-xl font-light text-stone-900">{fmtPrice(apt.price)}</span>
                </div>

                {/* CTA */}
                <div className="px-6 py-4 md:py-5 flex items-center">
                  <Link
                    href="/et/kontakt"
                    className="inline-block font-sans text-xs tracking-widest uppercase text-stone-800 border border-stone-300 hover:border-stone-800 px-5 py-2.5 transition-all duration-300 whitespace-nowrap"
                  >
                    Küsi infot
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="font-sans text-xs text-stone-400 mt-5 leading-relaxed">
            Hinnad on orienteeruvad ja ei sisalda notaritasusid, riigilõivusid ega muid tehingukulusid.
            Detailse teabe saamiseks võtke meiega ühendust.
          </p>
        </div>
      </section>

      {/* Financing section */}
      <FinancingSection />

      {/* Viewing CTA */}
      <section className="bg-stone-950 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="label-eyebrow text-stone-500 mb-3">Privaatne vaatamine</p>
            <h2
              className="font-serif font-light text-stone-100"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              Soovite korterit oma silmaga näha?
            </h2>
          </div>
          <Link
            href="/et/kontakt"
            className="inline-block font-sans text-xs tracking-widest uppercase text-stone-950 bg-stone-100 hover:bg-white px-10 py-4 transition-all duration-400 whitespace-nowrap"
          >
            Broneeri vaatamine
          </Link>
        </div>
      </section>
    </>
  );
}
