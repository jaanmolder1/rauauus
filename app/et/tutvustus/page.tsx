import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "Tutvustus — Raua 22 | Raua asum, Tallinn",
  description:
    "Raua 22 tutvustus — muinsuskaitsealune korterelamu Raua asumis, Tallinnas. Viis erakordset eluruumi, kus ajalugu ja kaasaegne mugavus kohtuvad.",
  openGraph: {
    title: "Tutvustus — Raua 22",
    description:
      "Muinsuskaitsealune korterelamu Raua asumis, Tallinnas. Viis erakordset eluruumi.",
    locale: "et_EE",
  },
};

export default function TutvustusPage() {
  return (
    <>
      <HeroSection
        eyebrow="Tutvustus"
        title="Raua asum. Ajalugu. Elamiseks."
        subtitle="Raua 22 on enamat kui hoone — see on kogemus, mis algab uksest sisse astudes."
        imageSrc="/images/building-exterior.jpeg"
        imageAlt="Raua 22 hoone fassaad"
        overlay="dark"
        height="large"
        align="left"
      />

      {/* Positioning statement */}
      <section className="bg-stone-950 py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="label-eyebrow text-stone-500 mb-8">Mis teeb Raua 22 eriliseks</p>
            <h2 className="font-serif font-light text-stone-100 leading-[1.15] mb-8"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}>
              Mitte iga hoone ei kesta oma ajastust kauem. Raua 22 on seda teinud — ja teeb seda ka tulevikus.
            </h2>
            <p className="font-sans font-light text-stone-400 leading-[1.85] text-sm lg:text-base">
              Muinsuskaitsealune hoone väljakujunenud Raua asumis on püsiväärtuse selge väljendus. Selle arhitektuurne iseloom, hinnatud asukoht ja läbimõeldud rekonstrueerimine loovad elukeskkonna, mille väärtus ajas ei kahane.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 — Asukoht */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="label-eyebrow mb-6">Asukoht</p>
              <h2 className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}>
                Raua asum — väljakujunenud aadress Tallinna südames
              </h2>
              <div className="space-y-5 mb-10">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Raua tänav läbib Raua asumi südant — varakult 20. sajandil väljakujunenud elamupiirkonda, mida iseloomustavad ajaloolised tänavapuud ja ajastule omane arhitektuur. Tänaval valitsev vaikus on selle paiga loomulik osa; linnakiirus jääb mitmeastmelise vahemaa taha.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Kadriorgu park on jalutuskäigu kaugusel. Tallinna vanalinn ja kesklinn on kättesaadavad 10–15 minutiga jala. Ligipääs ühistranspordi peatustele ja peamistele magistraalidele on mugav, kuid igapäevaelu ei mõjuta liiklusest tingitud müra ega rahvamass.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Ümbrus pakub kõike, mida rahulik linnaelu nõuab — apteeke, päevakauplusi, koole ja kultuuriasutusi — ilma suurlinlikku kiiret tempot peale surumata.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/kadriorg-view.png"
                alt="Raua asum ja ümbrus"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Hoone */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative aspect-[4/5] overflow-hidden lg:order-first order-last">
              <Image
                src="/images/building-detail.jpeg"
                alt="Raua 22 arhitektuuridetailid"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="label-eyebrow mb-6">Hoone</p>
              <h2 className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}>
                Restaureeritud fassaad, uuendatud sisekliima
              </h2>
              <div className="space-y-5 mb-10">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Hoone on läbinud põhjaliku rekonstrueerimise, mille käigus on muinsuskaitse nõuete kohaselt säilitatud algupärane fassaad, kandetarindid ja arhitektuurselt olulised sisemised elemendid. Kõik materjalid on valitud kooskõlas kaitsealuse hoone nõuetega.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Hoone on varustatud tänapäevaste tehnosüsteemidega: uuendatud elektri- ja torustiku infrastruktuur, kaasaegne küttesüsteem, soojustatud aknad, mis säilitavad algupärase profiili, ning nõuetekohane ventilatsiooni lahendus.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Hoonesse sisenemine on turvatud. Sissepääs toimub eraldi koodiga kaetud ukse kaudu, hoovialale ligipääs on piiratud. Privaatsus on tagatud nii hoone sees kui väljas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Elamine */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="label-eyebrow mb-6">Elamine</p>
            <h2 className="font-serif font-light text-stone-900 leading-tight mb-7"
              style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}>
              Viis kodu, viis erinevat ruumikogemust
            </h2>
            <div className="space-y-5 mb-12">
              <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                Igal Raua 22 korteril on oma iseloom. Esimese korruse korterid avanevad huvitatult hoovile — vaikne, privaatne vaade ja kõrged laged loovad argielu jaoks haruldase rahu. Ülemised korterid pakuvad paremat valgust ja vaateid, säilitades samal ajal aja iseärasused.
              </p>
              <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                Korteriplaanid on kujundatud funktsionaalsust silmas pidades — avarad elutoad, lahti köögiplaneering, hästi eraldatud magamistoad ja ruumikad vannitoad, milles on kasutatud kvaliteetseid naturaalmaterjale.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-12">
              {[
                { num: "5", label: "Eksklusiivset korterit" },
                { num: "89–117", label: "Ruutmeetrit" },
                { num: "100+", label: "Aastat ajalugu" },
                { num: "1", label: "Privaatne hooviaedik" },
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
              href="/et/korterid"
              className="inline-block font-sans text-xs tracking-widest uppercase text-stone-800 border border-stone-300 hover:border-stone-800 px-7 py-3.5 transition-all duration-400"
            >
              Vaadake kortereid
            </Link>
          </div>
        </div>
      </section>

      {/* CTA stripe */}
      <section className="bg-stone-950 py-20 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="font-serif font-light text-stone-100 mb-2"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
              Soovite rohkem teavet?
            </h2>
            <p className="font-sans font-light text-stone-500 text-sm">
              Korraldame privaatse tutvumiskäigu teile sobival ajal.
            </p>
          </div>
          <Link
            href="/et/kontakt"
            className="inline-block font-sans text-xs tracking-widest uppercase text-stone-950 bg-stone-100 hover:bg-white px-10 py-4 transition-all duration-400 whitespace-nowrap"
          >
            Võtke ühendust
          </Link>
        </div>
      </section>
    </>
  );
}
