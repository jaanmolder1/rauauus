import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "Kontakt — Raua 22 | Kadriorg, Tallinn",
  description:
    "Võtke ühendust Raua 22 meeskonnaga. Korraldame privaatse tutvumiskäigu Kadrioru eksklusiivses kortermajas.",
  openGraph: {
    title: "Kontakt — Raua 22",
    description: "Korraldame privaatse tutvumiskäigu teile sobival ajal.",
    locale: "et_EE",
  },
};

export default function KontaktPage() {
  return (
    <>
      <HeroSection
        eyebrow="Kontakt"
        title="Ootame teid tutvuma"
        subtitle="Privaatne ja diskreetne — oma tempoga tutvumine erakordse kinnisvaraga."
        imageSrc="/images/building-courtyard.jpeg"
        imageAlt="Raua 22 hooviaedik"
        overlay="dark"
        height="medium"
        align="center"
      />

      {/* Contact section */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
            {/* Left — info */}
            <div>
              <p className="label-eyebrow mb-7">Privaatne vaatamine</p>
              <h2
                className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
              >
                Korraldame tutvumise, mis vastab teie ajagraafikule
              </h2>
              <div className="space-y-5 mb-12">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Raua 22 korteritega tutvumine on alati privaatne. Me ei korraja avatud uste päevi ega massiüritusi — iga vaatamine on individuaalne, korraldatud teile sobival ajal ja rahulikus tempos.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Saatke meile oma huvi ja me võtame ühendust 24 tunni jooksul, et leppida kokku teile sobiv aeg.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-6">
                <div>
                  <p className="label-eyebrow mb-2">E-post</p>
                  <a
                    href="mailto:info@raua22.ee"
                    className="font-sans text-stone-700 hover:text-bronze transition-colors duration-300 text-sm"
                  >
                    info@raua22.ee
                  </a>
                </div>
                <div>
                  <p className="label-eyebrow mb-2">Telefon</p>
                  <a
                    href="tel:+3725XXXXXXX"
                    className="font-sans text-stone-700 hover:text-bronze transition-colors duration-300 text-sm"
                  >
                    +372 5XXX XXXX
                  </a>
                </div>
                <div>
                  <p className="label-eyebrow mb-2">Aadress</p>
                  <p className="font-sans text-stone-700 text-sm">
                    Raua 22, Tallinn 10124
                    <br />
                    Eesti
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="divider-bronze my-12" />

              {/* Exclusivity note */}
              <div className="bg-stone-50 border border-stone-200 p-7">
                <p className="label-eyebrow mb-3">Diskreetsus on meie põhimõte</p>
                <p className="font-sans font-light text-stone-500 leading-relaxed text-sm">
                  Kõik päringud on konfidentsiaalsed. Me ei jaga teie andmeid kolmandate osapooltega ega kasuta neid turunduslikel eesmärkidel. Teie kontakt jõuab otse vastutava inimeseni.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <p className="label-eyebrow mb-7">Saatke päring</p>
              <ContactForm lang="et" />
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-stone-950 py-16">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-800/30">
            {[
              {
                label: "Kadriorgu park",
                value: "5 min",
                unit: "jalutuskäik",
              },
              {
                label: "Tallinna kesklinn",
                value: "15 min",
                unit: "jalutuskäik",
              },
              {
                label: "Lennujaam",
                value: "12 min",
                unit: "autoga",
              },
            ].map((item) => (
              <div key={item.label} className="bg-stone-900/30 p-8 lg:p-10 text-center">
                <p className="label-eyebrow text-stone-500 mb-2">{item.label}</p>
                <p className="font-serif text-4xl font-light text-stone-100 mb-1">{item.value}</p>
                <p className="font-sans text-xs text-stone-600 tracking-wide">{item.unit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
