import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ApartmentListSection from "@/components/ApartmentListSection";
import { apartments } from "@/lib/apartmentData";


export const metadata: Metadata = {
  title: "Korterid — Raua 22 | Raua asum, Tallinn",
  description:
    "Viis eksklusiivset korterit Raua 22-s, Raua asumis — 89 kuni 117 ruutmeetrit, kõrged laed, restaureeritud algupärased põrandad ja kaasaegne mugavus muinsuskaitsealuses hoones.",
  openGraph: {
    title: "Korterid — Raua 22",
    description: "Viis eksklusiivset korterit 89–117 m² Raua asumi muinsuskaitsealuses hoones.",
    locale: "et_EE",
  },
};

export default function KorteridPage() {
  return (
    <>
      <HeroSection
        eyebrow="Korterid"
        title="Viis kodu. Iga üks erinev."
        subtitle="Igal Raua 22 korteril on oma iseloom, oma vaade ja oma lugu. Valik tagab, et iga ostja leiab endale sobiva kodu."
        imageSrc="/images/apartment-interior.jpeg"
        imageAlt="Raua 22 korterite interjöör"
        overlay="dark"
        height="large"
        align="left"
      />

      {/* Intro stats */}
      <section className="bg-stone-950 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-800/30">
            {[
              { num: "5", label: "Eksklusiivset korterit" },
              { num: "89–117 m²", label: "Pindade vahemik" },
              { num: "3–4", label: "Toaline" },
            ].map((stat) => (
              <div key={stat.label} className="bg-stone-900/30 p-10 lg:p-12">
                <p className="font-serif text-5xl font-light text-stone-100 mb-3">{stat.num}</p>
                <p className="label-eyebrow text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ApartmentListSection apartments={apartments} lang="et" />

      {/* Heritage section */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="label-eyebrow mb-6">Muinsuslikud elemendid</p>
              <h2
                className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
              >
                Säilitatud detailid, mis ei vanane
              </h2>
              <div className="space-y-5 mb-10">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Igas korteris on algupärased puitpõrandad säilitatud ja restaureeritud. Kasutatud on konserveerimismeetodit,
                  mis taastab algupärase tooni ja tekstuuri, pikendades samal ajal kasutuseiga aastakümnete võrra.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Kõrged laed (3,0–3,4 m) annavad igale korterile proportsionaalse ruumitunde. Aknad pole välja vahetatud —
                  lubjakivi ja puitraamid säilitavad algupärase profiili, kuid nende soojapidavust on kaasajastatud.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "Restaureeritud algupärased puitpõrandad",
                  "Kõrged laed (3,0–3,4 m)",
                  "Algupärased aknaavad ja proportsioonid",
                  "Restaureerimine vastavalt muinsuskaitsenõuetele",
                  "Kaasaegne ventilatsioon ja küttesüsteem",
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
                alt="Muinsuslikud detailid Raua 22-s"
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
