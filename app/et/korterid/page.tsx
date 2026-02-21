import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";

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

const apartments = [
  {
    id: "apt-1",
    number: "Korter 1",
    title: "Hoovikorter — Avar neljatoaline",
    area: "113 m²",
    floor: "1. korrus",
    rooms: "4 tuba",
    description:
      "Esimese korruse suurim korter avaneb privaatsele hoovialale. Kolm eraldatud magamistuba, avar köök-elutuba (35,7 m²) ja kaks garderoobikapp annavad ruumi kõigile igapäevaelu vajadustele. Restaureeritud puitpõrandad ja kõrged laed säilitavad hoone algupärase väärikuse.",
    features: [
      "3 magamistuba",
      "2 garderoob",
      "Köök-elutuba 35,7 m²",
      "Privaatne hoovi vaade",
      "Restaureeritud põrandad",
    ],
    imageSrc: "/images/apartment-interior.jpeg",
    imageAlt: "Korter 1 elutuba",
  },
  {
    id: "apt-2",
    number: "Korter 2",
    title: "Kabinetiga korter — Töö ja kodu ühes",
    area: "99 m²",
    floor: "1. korrus",
    rooms: "3 tuba + kabinet",
    description:
      "Esimese korruse kompaktne ja funktsionaalne korter pakub eraldatud kabinetiga töötamise võimalust kodus. Kaks magamistuba, avar köök-elutuba (32,1 m²) ja garderoob moodustavad hästi läbimõeldud terviku algupärases muinsuskaitsealuses keskkonnas.",
    features: [
      "2 magamistuba",
      "Eraldatud kabinet 9,3 m²",
      "Köök-elutuba 32,1 m²",
      "Garderoob",
      "Restaureeritud põrandad",
    ],
    imageSrc: "/images/apartment-living.jpeg",
    imageAlt: "Korter 2 elutuba",
  },
  {
    id: "apt-3",
    number: "Korter 3",
    title: "Rõduga korter — Roheluse vaade",
    area: "100 m²",
    floor: "2. korrus",
    rooms: "3 tuba",
    description:
      "Teise korruse korter 23 m² rõduga pakub haruldast välitila linnasüdames. Kaks magamistuba, avar köök-elutuba (34,3 m²) ja kaks garderoobikappi on paigutatud sujuvalt. Kõrged laed ning vana ornamenteeritud trepikoda rõhutavad hoone ajaloolist iseloomu.",
    features: [
      "Rõdu 23 m²",
      "2 magamistuba",
      "Köök-elutuba 34,3 m²",
      "2 garderoob",
      "Kõrged laed",
    ],
    imageSrc: "/images/building-exterior.jpeg",
    imageAlt: "Korter 3 rõdu",
  },
  {
    id: "apt-4",
    number: "Korter 4",
    title: "Kahe rõduga korter — Hele ja privaatne",
    area: "89 m²",
    floor: "2. korrus",
    rooms: "3 tuba",
    description:
      "Kaks rõdu (19,5 m² ja 12,9 m², kokku üle 32 m²) annavad sellele teise korruse korterile erandliku heleduse ja välitila. Kaks magamistuba ning avar köök-elutuba (33,4 m²) on sujuvalt planeeritud. Parkimine hoovis tagab igapäevase mugavuse.",
    features: [
      "2 rõdu (kokku 32 m²)",
      "2 magamistuba",
      "Köök-elutuba 33,4 m²",
      "Garderoob",
      "Parkimine hoovis",
    ],
    imageSrc: "/images/building-detail.jpeg",
    imageAlt: "Korter 4 rõdu",
  },
  {
    id: "apt-5",
    number: "Korter 5",
    title: "Perekorter — Terrassiga tippkorter",
    area: "117 m²",
    floor: "3. korrus",
    rooms: "4 tuba",
    description:
      "Suurim korter majas pakub perekonnale ruumi ja privaatsust. Avara terrassiga (29,7 m²) tippkorter vaadetega piirkonna puiestee roheluse üle, kolm eraldatud magamistuba, kaks vannituba ja köök-elutuba (38,1 m²) — ainulaadne kombinatsioon linnakeskkonnas.",
    features: [
      "Terrass 29,7 m²",
      "3 magamistuba",
      "2 vannituba",
      "Köök-elutuba 38,1 m²",
      "Garderoob",
    ],
    imageSrc: "/images/raua22-render.png",
    imageAlt: "Korter 5 — terrassiga tippkorter",
  },
];

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
        align="center"
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
                  {/* Specs */}
                  <div className="flex items-center gap-6 mb-7 pb-7 border-b border-stone-100">
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
