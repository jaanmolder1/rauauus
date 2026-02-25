import Link from "next/link";
import Logo from "./Logo";

interface FooterProps {
  lang: "et" | "en";
}

const content = {
  et: {
    brand:
      "Raua 22 on erakordne võimalus omandada kodu ühes Tallinna väärikamas ajaloolises hoones. Muinsuskaitsealune arhitektuuripärand, mis on uuendatud kaasaegse elukvaliteedi standarditele, säilitades samal ajal oma ajaloolise iseloomu ja väärikuse.",
    nav: [
      { label: "Tutvustus", href: "/et/tutvustus" },
      { label: "Ajalugu", href: "/et/ajalugu" },
      { label: "Korterid", href: "/et/korterid" },
      { label: "Kontakt", href: "/et/kontakt" },
    ],
    contact: "info@raua22.ee",
    phone: "+372 5XXX XXXX",
    legal: "© 2025 Raua 22. Kõik õigused kaitstud.",
    address: "Raua 22, Tallinn 10124, Eesti",
    langLabel: "In English",
    langHref: "/en",
  },
  en: {
    brand:
      "Raua 22 is a rare opportunity to acquire a home in one of Tallinn's most distinguished heritage buildings. A listed architectural landmark, restored to contemporary standards of living while preserving its historical character and dignity.",
    nav: [
      { label: "Overview", href: "/en/overview" },
      { label: "History", href: "/en/history" },
      { label: "Apartments", href: "/en/apartments" },
      { label: "Contact", href: "/en/contact" },
    ],
    contact: "info@raua22.ee",
    phone: "+372 5XXX XXXX",
    legal: "© 2025 Raua 22. All rights reserved.",
    address: "Raua 22, Tallinn 10124, Estonia",
    langLabel: "Eesti keeles",
    langHref: "/et",
  },
};

export default function Footer({ lang }: FooterProps) {
  const c = content[lang];

  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-20 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pb-16 border-b border-stone-800/50">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href={`/${lang}`}
              className="inline-block mb-6 opacity-80 hover:opacity-100 transition-opacity duration-300"
              aria-label="Raua Residences"
            >
              <Logo className="h-10 w-auto" color="#9c8670" />
            </Link>
            <p className="font-sans text-sm leading-relaxed text-stone-500 max-w-md">
              {c.brand}
            </p>
          </div>

          {/* Nav + Contact */}
          <div className="flex flex-col gap-8">
            <nav>
              <p className="label-eyebrow mb-4">
                {lang === "et" ? "Lehed" : "Pages"}
              </p>
              <ul className="flex flex-col gap-2.5">
                {c.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-sans text-sm text-stone-500 hover:text-stone-200 transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="label-eyebrow mb-4">
                {lang === "et" ? "Kontakt" : "Contact"}
              </p>
              <a
                href={`mailto:${c.contact}`}
                className="font-sans text-sm text-stone-500 hover:text-bronze-light transition-colors duration-300 block mb-1"
              >
                {c.contact}
              </a>
              <a
                href={`tel:${c.phone.replace(/\s/g, "")}`}
                className="font-sans text-sm text-stone-500 hover:text-bronze-light transition-colors duration-300 block"
              >
                {c.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-sans text-xs text-stone-700">{c.legal}</p>
            <p className="font-sans text-xs text-stone-700">{c.address}</p>
          </div>
          <Link
            href={c.langHref}
            className="font-sans text-xs tracking-widest uppercase text-stone-600 hover:text-stone-300 transition-colors duration-300"
          >
            {c.langLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
