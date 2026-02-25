import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "Ajalugu — Raua 22 | Raua asum, Tallinn",
  description:
    "Raua 22 hoone ajalugu — muinsuskaitsealune arhitektuuripärand Raua asumis, mis on läbinud põhjaliku restaureerimise, säilitades oma algupärase iseloomu.",
  openGraph: {
    title: "Ajalugu — Raua 22",
    description:
      "Üle saja aasta vana arhitektuuripärand, mis on restaureeritud tänapäevaks.",
    locale: "et_EE",
  },
};

export default function AjaluguPage() {
  return (
    <>
      <HeroSection
        eyebrow="Ajalugu"
        title="Üle sajandi on see hoone Raua asumi ellu kirjutatud."
        imageSrc="/images/building-detail.jpeg"
        imageAlt="Raua 22 ajaloolised arhitektuuridetailid"
        overlay="dark"
        height="large"
        align="left"
      />

      {/* Timeline intro */}
      <section className="bg-stone-950 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="label-eyebrow text-stone-500 mb-8">Päritolu</p>
            <h2 className="font-serif font-light text-stone-100 leading-[1.15] mb-8"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}>
              Hoone, mis on säilinud läbi Tallinna muutliku 20. sajandi — muutumata selle olemuselt.
            </h2>
            <p className="font-sans font-light text-stone-400 leading-[1.85] text-sm lg:text-base">
              Raua 22 ehitati 1910. aastate alguses, mil Raua asum kujunes üheks Tallinna otsituimaks elamupiirkonnaks. Hoone tellija oli kohalik kaupmee- ja tööstusperekond, kelle eesmärk oli luua esinduslik korterelamu piirkonna kõrgeimate elamistandardite järgi. Projekti autor on tänases päevas tuvastamata, kuid hoone arhitektuuriline stiil — ühendades art nouveau detaile ja rahvusromantismi — viitab Põhja-Euroopa haridusega arhitektile.
            </p>
          </div>
        </div>
      </section>

      {/* Era 1 */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="label-eyebrow mb-4">1910 – 1940</p>
              <h2 className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                Esimesed aastakümned: esinduslik algus
              </h2>
              <div className="space-y-5">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Hoone valmis umbes 1912. aastal ja avati kohaliku eliidi koduks. Algupärased korterid olid mõõdukad — 4–6 toaga, kõrgete lagedega ja suureakendega, mis andsid lõunakülgede ruumidesse külluses päikesevalgust. Sissepääsu ette oli kavandatud dekoratiivne trepikoda, mille reliefkaunistused viitasid saksa ja prantsuse disainimõjudele.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Eesti Vabariigi iseseisvumisele järgnenud aastatel 1920ndatel andis piirkonnale lisaprestiiži lähedus Kadrioru presidendiresidentsile ja kujuneval diplomaatilisele kvartalile. Raua 22 elanikud kuulusid sel perioodil Tallinna haritlaskonna ja äriklassi hulka.
                </p>
              </div>
            </div>
            <div className="relative aspect-4/3 overflow-hidden mt-8 lg:mt-16">
              <Image
                src="/images/building-exterior.jpeg"
                alt="Raua 22 hoone fassaad"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Era 2 */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="relative aspect-4/3 overflow-hidden">
              <Image
                src="/images/building-courtyard.jpeg"
                alt="Hooviaed"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="label-eyebrow mb-4">1940 – 1991</p>
              <h2 className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                Nõukogude periood: kangekaelne püsimine
              </h2>
              <div className="space-y-5">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Nõukogude anneksiooni järgselt natsionaliseeriti hoone ning korterid jagati kommunaalkorteriteks. Ruumid poolitati ja originaalplaneeringut muudeti. Sellele vaatamata säilis hoone struktuurne terviklikkus tänu tugevale algsele ehitusele — paekivi vundament ja paksud tellismüürid pidasid vastu nii füüsiliselt kui esteetiliselt.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Hoolimata üldisest hoolitsuse puudumisest — eriti 1970ndatel ja 1980ndatel, mil paljud piirkonna hooned kannatasid pöördumatu kahjustuse all — jäi Raua 22 fassaad suhteliselt terveks. Paekivisammastel säilisid oma profiilid, aknaraamid hoidsid proportsioonid ja trepikoja dekoratiivstukk püsis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Era 3 — Restaureerimine */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="label-eyebrow mb-6">2020 – 2025</p>
            <h2 className="font-serif font-light text-stone-900 leading-tight mb-7"
              style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}>
              Restaureerimine: lugupidamine mineviku, investeering tulevikku
            </h2>
            <div className="space-y-5 mb-16">
              <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                2020. aastal alustati Raua 22 põhjaliku ja koordineeritud restaureerimisprojektiga. Projekt viidi ellu tihedas koostöös Muinsuskaitseameti ekspertidega, järgides täielikult kaitsealuse hoone restaureerimisnõudeid ja -soovitusi. Iga otsus — alates fassaadivärvi valikust kuni aknapuidu profiilini — kinnitati muinsuskaitsega.
              </p>
              <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                Trepikoda restaureeriti algupäraste fotode ja arhiivimaterjalide põhjal. Käsitöölised taastasid kahjustatud stukkornamentika, puhastasid paekivist pinnad ning lihvisid ja laseeriti originaalse puidust põrandad. Värvipaletiproovide analüüs andis teada algupärased toonid, mis taastati.
              </p>
              <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                Samal ajal uuendati kõik tehnosüsteemid täielikult: torustik, elekter, soojustus, ventilatsioon ja turvasüsteemid vastavad uusehitiste tehnilistele nõuetele. Korterite plaanid kujundati uuesti, et taastada lähedane originaalsele — kõrged laed, avatud ahelaplaaneeringud — kaasaegse funktsionaalsusega.
              </p>
            </div>
          </div>

          {/* Detail callouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200">
            {[
              {
                title: "Fassaad",
                body: "Restaureeritud algupärase paekivi ja savikrohviga. Värvitoon valitud arhiivimaterjalide põhjal.",
              },
              {
                title: "Trepikoda",
                body: "Stukkornamentika ja käsipuud taastatud vanafotode põhjal käsitööliste poolt.",
              },
              {
                title: "Aknad",
                body: "Algupärase profiili säilitanud puitsed aknad, kaksikklaasiga soojustuslahendus.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 lg:p-10">
                <h3 className="font-serif text-xl font-light text-stone-900 mb-3">{item.title}</h3>
                <p className="font-sans text-sm font-light text-stone-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Muinsuskaitse note */}
      <section className="bg-stone-950 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="label-eyebrow text-stone-500 mb-6">Muinsuskaitse</p>
            <p className="font-serif font-light text-stone-300 leading-[1.4] mb-6"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}>
              Raua 22 on kantud riiklikusse muinsusregistrisse arhitektuurimälestisena.
            </p>
            <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base mb-8">
              See staatusel on praktiline tähendus: hoone tulevik on kaitstud läbi seaduse. Selle fassaad, konstruktsioonid ja arhitektuuriliselt olulised elemendid säilivad. See on haruldane stabiilsusgarantii investeeringule.
            </p>
            <Link
              href="/et/kontakt"
              className="inline-block font-sans text-xs tracking-widest uppercase text-stone-200 border border-stone-600 hover:border-stone-300 px-7 py-3.5 transition-all duration-400"
            >
              Küsige lisateavet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
