import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import { apartments } from "@/lib/apartmentData";

export const metadata: Metadata = {
  title: "Korterid — Raua 22 | Raua asum, Tallinn",
  description:
    "Raua 22 viis eksklusiivset korterit Raua asumis — 89 kuni 117 ruutmeetrit, kõrged laed, algupärased põrandad ja kaasaegsed mugavused muinsuskaitsealuses hoones.",
  openGraph: {
    title: "Korterid — Raua 22",
    description: "Viis eksklusiivset korterit 89–117 m² Raua asumi muinsuskaitsealuses hoones.",
    locale: "et_EE",
  },
};

function fmtPrice(n: number) {
  return new Intl.NumberFormat("et-EE", { maximumFractionDigits: 0 }).format(n) + " €";
}

export default function KorteridPage() {
  return (
    <>
      <HeroSection
        eyebrow="Korterid"
        title="Viis kodu. Iga üks erinev."
        subtitle="Igal Raua 22 korteril on oma iseloom, oma vaade ja oma lugu. Korterite valik tagab, et igaüks leiab oma elurütmile vastava kodu."
        imageSrc="/images/apartment-interior.jpeg"
        imageAlt="Raua 22 korterite interjöör"
        overlay="dark"
        height="large"
        align="left"
      />

      {/* Intro */}
      <section className="bg-stone-950 py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-800/30">
            {[
              { num: "5", label: "Eksklusiivset korterit" },
              { num: "89–117 m²", label: "Pindade vahemik" },
              { num: "3–4", label: "Tubade valik" },
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
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <p className="label-eyebrow mb-12">Saadaval korterid</p>
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
                  className={`relative aspect-[4/3] lg:aspect-auto overflow-hidden ${
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
                  {/* Specs + Price */}
                  <div className="flex items-center gap-6 mb-7 pb-7 border-b border-stone-100 flex-wrap">
                    <div>
                      <p className="label-eyebrow text-stone-400 mb-1">Pind</p>
                      <p className="font-serif text-2xl font-light text-stone-900">{apt.area}</p>
                    </div>
                    <div className="h-8 w-px bg-stone-200" />
                    <div>
                      <p className="label-eyebrow text-stone-400 mb-1">Korrus</p>
                      <p className="font-serif text-2xl font-light text-stone-900">{apt.floor}</p>
                    </div>
                    <div className="h-8 w-px bg-stone-200" />
                    <div>
                      <p className="label-eyebrow text-stone-400 mb-1">Toad</p>
                      <p className="font-serif text-2xl font-light text-stone-900">{apt.rooms}</p>
                    </div>
                    <div className="h-8 w-px bg-stone-200" />
                    <div>
                      <p className="label-eyebrow text-stone-400 mb-1">Hind</p>
                      <p className="font-serif text-2xl font-light text-stone-900">{fmtPrice(apt.price)}</p>
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
                    href="/et/kontakt"
                    className="inline-block font-sans text-xs tracking-widest uppercase text-stone-800 border border-stone-800 hover:bg-stone-950 hover:text-stone-100 px-7 py-3.5 transition-all duration-400 self-start"
                  >
                    Küsi infot selle korteri kohta
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage elements section */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="label-eyebrow mb-6">Ajaloolised elemendid</p>
              <h2
                className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
              >
                Säilitatud detailid, mis ei vanane
              </h2>
              <div className="space-y-5 mb-10">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Kõikides korterites on säilitatud ja restaureeritud ajalooline puitpõrand. Valitud on konserveerimismeetod, mis taastab originaalse tooni ja tekstuuri, kuid pikendab kasutusiga kümnete aastate võrra.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Kõrged laed (3,0–3,4 m) annavad igale korterile proportsionaalse suuruse. Korterites, kus algupärane stukkliist oli säilinud, on see restaureeritud. Aknaid ei ole asendatud plastikuga — paekivi- ja puitsed raamid hoiavad algset profiili, kuid nende soojustus on kaasajastatud.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "Restaureeritud puitpõrandad",
                  "Kõrged laed (3,0–3,4 m)",
                  "Algupärased aknapositsioonid ja -proportsioonid",
                  "Muinsuskaitse nõuetekohane restaureerimine",
                  "Kaasaegne ventilatsioon ja küttesüsteem",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-bronze flex-shrink-0" />
                    <p className="font-sans text-sm font-light text-stone-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/building-detail.jpeg"
                alt="Ajaloolised detailid Raua 22-s"
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
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
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
