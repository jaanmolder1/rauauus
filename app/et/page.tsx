import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { jsonLdProperty, jsonLdOrganization } from "@/lib/metadata";
import MotionBlurHeroClient from "@/components/MotionBlurHeroClient";
import type { HeroSlide } from "@/components/MotionBlurHero";


export const metadata: Metadata = {
  title: "Raua 22 | Raua asum, Tallinn",
  description:
    "Viis erakordset korterit muinsuskaitsealuses ajaloolises hoones Raua asumis, Tallinnas. Arhitektuuripärand, mis on uuendatud kaasaegse elukvaliteedi standarditele.",
  keywords: [
    "Raua asum korterid",
    "muinsuskaitsealune hoone Tallinn",
    "eksklusiivne kinnisvara Raua asum",
    "ajaloolised korterid Tallinn",
    "Raua tänav kinnisvara",
  ],
  openGraph: {
    title: "Raua 22 — Raua asum, Tallinn",
    description:
      "Viis erakordset korterit muinsuskaitsealuses ajaloolises hoones Raua asumis, Tallinnas.",
    locale: "et_EE",
  },
};

const heroSlides: HeroSlide[] = [
  {
    image: "/images/building-render.jpeg",
    eyebrow: "Raua 22 · Tallinn",
    title: "Eksklusiivne kodu ajaloolises kvartalis",
    subtitle: "Viis erilist korterit. Üks erakordne hoone.",
  },
  {
    image: "/images/building-street.jpeg",
    eyebrow: "Raua 22",
    title: "Ajalugu ja kaasaeg ühes hoones",
    subtitle: "Muinsuskaitsealune arhitektuur, restaureeritud kaasaegseks eluks.",
  },
  {
    image: "/images/building-courtyard.jpeg",
    eyebrow: "Raua asum",
    title: "Privaatne elukeskkond",
    subtitle: "Seitse parkimiskohta hoovis. Turvaline ja vaikne.",
  },
  {
    image: "/images/apartment-interior.jpeg",
    eyebrow: "Korterid",
    title: "Arhitektuurne pärand, uuendatud elamiseks",
    subtitle: "Restaureeritud detailid kohtuvad kaasaegse mugavusega.",
  },
  {
    image: "/images/building-exterior.jpeg",
    eyebrow: "Raua asum · Tallinn",
    title: "Kodu, mis on enamat kui elukoht",
    subtitle:
      "Viis erakordset korterit muinsuskaitsealuses ajaloolises hoones. Arhitektuurne pärand, uuendatud elamiseks tänapäeval.",
  },
];

export default function EtHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLdOrganization, jsonLdProperty]),
        }}
      />

      {/* Hero */}
      <MotionBlurHeroClient
        slides={heroSlides}
        autoPlayMs={5000}
        ctaLabel="Tutvu korteritega"
        ctaHref="/et/tutvustus"
      />

      {/* Intro statement */}
      <section className="bg-stone-950 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="label-eyebrow text-stone-500 mb-8">Raua 22</p>
            <h2 className="font-serif font-light text-stone-100 leading-[1.15] mb-8"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}>
              Raua asum on üks Tallinna vaiksemaid ja väärikamaid elamupiirkondi. Raua 22 on selle vaimu kehastus — hoone, mis räägib ajaloost, kuid on loodud tulevikuks.
            </h2>
            <p className="font-sans font-light text-stone-400 leading-[1.85]"
              style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}>
              Viis hoolikalt rekonstrueeritud korterit ootavad neid, kes väärtustavad arhitektuurset eripära, vaikset elukeskkonda ja pikaajalise vara püsivat väärtust.
            </p>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="label-eyebrow mb-12">Miks Raua 22</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200">
            {[
              {
                num: "01",
                title: "Muinsuskaitse",
                body: "Riiklikult kaitsealune arhitektuurimälestis. Restaureerimine on teostatud muinsuskaitse nõudeid täielikult järgides.",
              },
              {
                num: "02",
                title: "Raua asum",
                body: "Elukoht ühes Tallinna väljakujunenud elamupiirkonnas — jalutuskäigu kaugusel Kadrioru pargist ja kesklinnast.",
              },
              {
                num: "03",
                title: "Viis korterit",
                body: "Ainult viis eksklusiivset korterit. Privaatsus, vaikus ja kogukond, kus naabreid tuntakse.",
              },
              {
                num: "04",
                title: "Parkimine hoovis",
                body: "Privaatne parkimine hoovialal. Vaikne ja turvaline elukeskkond koos mugavustega.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-white p-10 flex flex-col gap-4"
              >
                <span className="label-eyebrow text-stone-400">{item.num}</span>
                <h3 className="font-serif text-xl font-light text-stone-900">
                  {item.title}
                </h3>
                <p className="font-sans text-sm font-light text-stone-500 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image + text split */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative aspect-3/4 overflow-hidden">
              <Image
                src="/images/building-courtyard.jpeg"
                alt="Raua 22 hoovialue"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="label-eyebrow mb-6">Arhitektuuripärand</p>
              <h2 className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}>
                Säilitatud väärikuse ja tänapäevase mugavuse harmoonia
              </h2>
              <div className="space-y-5 mb-10">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Raua 22 hoone pärineb 20. sajandi algusest, mil Raua asum kujunes üheks Tallinna otsituimaks elamupiirkonnaks. Algne arhitektuur on hoolikalt säilitatud — ornamentika, kõrglaed, suurakende proportsioonid ja puidu detailid on restaureeritud algupäraste materjalide ja tehnikatega.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Samal ajal on korteritest saanud kaasaegsed kodud, kus puudub kompromiss mugavuste osas. Köögitehnika, küttesüsteemid, elekter ja akustiline isolatsioon vastavad kõrgeimate uusehitiste standarditele.
                </p>
              </div>
              <Link
                href="/et/ajalugu"
                className="inline-block font-sans text-xs tracking-widest uppercase text-stone-800 border border-stone-300 hover:border-stone-800 px-7 py-3.5 transition-all duration-400"
              >
                Lugege ajalugu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Apartments teaser */}
      <section className="bg-stone-950 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <p className="label-eyebrow text-stone-500 mb-5">Korterid</p>
              <h2 className="font-serif font-light text-stone-100 leading-tight"
                style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}>
                Viis ainulaadset kodu
              </h2>
            </div>
            <Link
              href="/et/korterid"
              className="inline-block font-sans text-xs tracking-widest uppercase text-stone-300 border border-stone-700 hover:border-stone-300 px-7 py-3.5 transition-all duration-400 whitespace-nowrap"
            >
              Kõik korterid
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-800/30">
            {[
              { label: "89 – 99 m²", desc: "Kolmetoalised korterid kahe rõdu või kabinetiga esimesel ja teisel korrusel" },
              { label: "100 – 113 m²", desc: "Avarad kolme- ja neljatoalised korterid rõdu ja kõrgete laedega" },
              { label: "117 m²", desc: "Eksklusiivne penthouse privaatse terrassi ja panoraamvaadetega" },
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
          alt="Vaade Raua asumile"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-stone-950/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="label-eyebrow text-stone-300/80 mb-6">Privaatne vaatamine</p>
          <h2 className="font-serif font-light text-stone-50 mb-8"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Kutsume teid tutvuma
          </h2>
          <p className="font-sans font-light text-stone-300 leading-relaxed mb-10 max-w-lg mx-auto text-sm lg:text-base">
            Korraldame diskreeetseid privaattuure aja- ja tempoga, mis teile sobib. Võtke ühendust ning me leiame sobiva aja.
          </p>
          <Link
            href="/et/kontakt"
            className="inline-block font-sans text-xs tracking-widest uppercase text-stone-950 bg-stone-100 hover:bg-white px-10 py-4 transition-all duration-400"
          >
            Võtke ühendust
          </Link>
        </div>
      </section>
    </>
  );
}
