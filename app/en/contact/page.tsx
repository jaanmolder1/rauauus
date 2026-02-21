import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "Contact — Raua 22 | Raua area, Tallinn",
  description:
    "Contact the Raua 22 team. We arrange private viewings of our exclusive residences in Raua area's heritage building at a time that suits you.",
  openGraph: {
    title: "Contact — Raua 22",
    description: "We arrange private viewings at a time and pace that suits you.",
    locale: "en_GB",
  },
};

export default function ContactPage() {
  return (
    <>
      <HeroSection
        eyebrow="Contact"
        title="We look forward to welcoming you"
        subtitle="Private and discreet — an introduction to an exceptional property at your own pace."
        imageSrc="/images/building-courtyard.jpeg"
        imageAlt="Raua 22 courtyard garden"
        overlay="dark"
        height="large"
        align="left"
      />

      {/* Contact section */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
            {/* Left — info */}
            <div>
              <p className="label-eyebrow mb-7">Private viewing</p>
              <h2
                className="font-serif font-light text-stone-900 leading-tight mb-7"
                style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
              >
                We arrange visits that fit your schedule
              </h2>
              <div className="space-y-5 mb-12">
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Viewings of Raua 22 are always private. We do not hold open days or group visits — every viewing is individual, arranged at a time that suits you and conducted at a calm, unhurried pace.
                </p>
                <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
                  Send us your enquiry and we will be in touch within 24 hours to agree a time that works for you.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-6">
                <div>
                  <p className="label-eyebrow mb-2">Email</p>
                  <a
                    href="mailto:info@raua22.ee"
                    className="font-sans text-stone-700 hover:text-bronze transition-colors duration-300 text-sm"
                  >
                    info@raua22.ee
                  </a>
                </div>
                <div>
                  <p className="label-eyebrow mb-2">Telephone</p>
                  <a
                    href="tel:+3725XXXXXXX"
                    className="font-sans text-stone-700 hover:text-bronze transition-colors duration-300 text-sm"
                  >
                    +372 5XXX XXXX
                  </a>
                </div>
                <div>
                  <p className="label-eyebrow mb-2">Address</p>
                  <p className="font-sans text-stone-700 text-sm">
                    Raua 22, Tallinn 10124
                    <br />
                    Estonia
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="divider-bronze my-12" />

              {/* Exclusivity note */}
              <div className="bg-stone-50 border border-stone-200 p-7">
                <p className="label-eyebrow mb-3">Discretion is our standard</p>
                <p className="font-sans font-light text-stone-500 leading-relaxed text-sm">
                  All enquiries are treated as confidential. We do not share your details with third parties or use them for any marketing purpose. Your contact reaches the responsible person directly.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <p className="label-eyebrow mb-7">Send an enquiry</p>
              <ContactForm lang="en" />
            </div>
          </div>
        </div>
      </section>

      {/* Distance panel */}
      <section className="bg-stone-950 py-16">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-800/30">
            {[
              { label: "Kadriorg Park", value: "5 min", unit: "on foot" },
              { label: "Tallinn city centre", value: "15 min", unit: "on foot" },
              { label: "Airport", value: "12 min", unit: "by car" },
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
