import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "History — Raua 22 | Raua asum, Tallinn",
  description:
    "The history of Raua 22 — a listed architectural heritage building in Raua asum, Tallinn, that has undergone comprehensive restoration, preserving its original character for future generations.",
  openGraph: {
    title: "History — Raua 22",
    description:
      "Over a century of architectural heritage, carefully restored for the present day.",
    locale: "en_GB",
  },
};

export default function HistoryPage() {
  return (
    <>
      <HeroSection
        eyebrow="History"
        title="For over a century, this building has been written into Raua asum's life"
        imageSrc="/images/building-detail.jpeg"
        imageAlt="Raua 22 historical architectural details"
        overlay="dark"
        height="large"
        align="left"
      />

      {/* Timeline intro */}
      <section className="bg-stone-950 py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="label-eyebrow text-stone-500 mb-8">Origin</p>
            <h2
              className="font-serif font-light text-stone-100 leading-[1.15] mb-8"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
            >
              A building that has endured through Tallinn's turbulent twentieth century — unchanged in its essential character.
            </h2>
            <p className="font-sans font-light text-stone-400 leading-[1.85] text-sm lg:text-base">
              Raua 22 was built in the early 1910s, when Raua asum was establishing itself as one of Tallinn's preferred residential addresses. The building was commissioned by a local merchant and industrial family whose ambition was to create a distinguished apartment building to the highest residential standards of the period. The architect remains unidentified today, but the building's architectural style — combining Art Nouveau ornamental detail with National Romantic structural sensibility — points to an architect educated in Northern Europe.
            </p>
          </div>
        </div>
      </section>

      {/* Era 1 */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="label-eyebrow mb-4">1910 – 1940</p>
              <h2
                className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                The early decades: a distinguished beginning
              </h2>
              <div className="space-y-5">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  The building was completed around 1912 and opened as a home for the local elite. The original apartments were generous — four to six rooms with high ceilings and large windows that brought abundant light into the south-facing rooms. The entrance was designed with a decorative stairwell whose relief ornamentation reflected German and French design influences.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  In the years following Estonian independence in the 1920s, the neighbourhood's proximity to the presidential residence at Kadriorg and the emerging diplomatic quarter nearby lent the area considerable prestige. Residents of Raua 22 during this period belonged to Tallinn's professional and cultural class.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden mt-8 lg:mt-16">
              <Image
                src="/images/building-exterior.jpeg"
                alt="Raua 22 building facade"
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
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/building-courtyard.jpeg"
                alt="Courtyard garden"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="label-eyebrow mb-4">1940 – 1991</p>
              <h2
                className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                The Soviet period: stubborn survival
              </h2>
              <div className="space-y-5">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  After the Soviet annexation, the building was nationalised and the apartments were converted into communal dwellings. Rooms were subdivided and the original floor plans were altered. Despite this, the building's structural integrity was preserved thanks to the strength of the original construction — limestone foundations and thick brick walls withstood both physical and aesthetic pressures.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Despite the general neglect — particularly during the 1970s and 1980s, when many buildings in the area suffered irreversible damage — the facade of Raua 22 remained relatively intact. The limestone pilasters retained their profiles, the window frames held their proportions and the decorative stucco of the stairwell survived.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Era 3 — Restoration */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="label-eyebrow mb-6">2020 – 2025</p>
            <h2
              className="font-serif font-light text-stone-900 leading-tight mb-7"
              style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
            >
              Restoration: respect for the past, investment in the future
            </h2>
            <div className="space-y-5 mb-16">
              <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                In 2020, a thorough and coordinated restoration project was begun at Raua 22. The project was carried out in close cooperation with the National Heritage Board, adhering fully to the requirements and recommendations for the restoration of listed buildings. Every decision — from the choice of facade colour to the profile of window timber — was approved by the heritage authority.
              </p>
              <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                The stairwell was restored on the basis of original photographs and archival material. Craftsmen reinstated damaged stucco ornamentation, cleaned the limestone surfaces and sanded and treated the original timber floors. Paint layer analysis revealed the original tones, which were faithfully restored.
              </p>
              <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                At the same time, all technical systems were completely renewed: plumbing, electrical installations, heating, ventilation and security systems all meet the technical requirements of new construction. Apartment layouts were redesigned to restore something close to the originals — high ceilings, generous room proportions — while incorporating contemporary functionality.
              </p>
            </div>
          </div>

          {/* Detail callouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200">
            {[
              {
                title: "Facade",
                body: "Restored using original limestone and lime render. Colour tones selected on the basis of archival material.",
              },
              {
                title: "Stairwell",
                body: "Stucco ornamentation and handrails reinstated from period photographs by specialist craftsmen.",
              },
              {
                title: "Windows",
                body: "Timber windows retaining the original profile, with upgraded double-glazed thermal insulation.",
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

      {/* Heritage note */}
      <section className="bg-stone-950 py-20 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="label-eyebrow text-stone-500 mb-6">Listed status</p>
            <p
              className="font-serif font-light text-stone-300 leading-[1.4] mb-6"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
            >
              Raua 22 is entered in the national heritage register as an architectural monument.
            </p>
            <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base mb-8">
              That status carries a practical meaning: the building's future is protected by law. Its facade, structure and architecturally significant elements will be preserved. This is a rare guarantee of stability for any long-term investment.
            </p>
            <Link
              href="/en/contact"
              className="inline-block font-sans text-xs tracking-widest uppercase text-stone-200 border border-stone-600 hover:border-stone-300 px-7 py-3.5 transition-all duration-400"
            >
              Request further information
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
