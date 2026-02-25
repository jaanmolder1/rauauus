"use client";

import { useState, useMemo } from "react";
import { apartments } from "@/lib/apartmentData";
import type { ApartmentInfo } from "@/lib/apartmentData";

// ── Mortgage formula ─────────────────────────────────────────────────────────
function calcMonthly(principal: number, annualRatePct: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function fmt(n: number) {
  return new Intl.NumberFormat("et-EE", { maximumFractionDigits: 0 }).format(n);
}

// ── Translations ─────────────────────────────────────────────────────────────

const CONTENT = {
  et: {
    eyebrow: "Finantseerimine",
    title: "Korteri ostu finantseerimine",
    intro:
      "Eluaseme soetamine on pikaajaline otsus. Allpool leiate ülevaate peamistest rahastamisvõimalustest ning kalkulaatori, mis aitab hinnata igakuiseid kulutusi.",
    infoPoints: [
      {
        num: "01",
        title: "Eluasemelaen",
        body: "Pangad finanseerivad üldjuhul kuni 80–85% ostuhinnast. Laenuperioodi pikkus on 20–30 aastat, intressimäär koosneb euriborist ja panga marginaalist.",
      },
      {
        num: "02",
        title: "Omafinantseering",
        body: "Tavapäraselt nõutakse 15–20% omaosalust. Suurem sissemakse tähendab väiksemat kuumakset ja madalamaid intressikulusid kogu laenuperioodi jooksul.",
      },
      {
        num: "03",
        title: "Riiklikud toetused",
        body: "KredEx käendus võimaldab vähendada nõutavat sissemakset kuni 10%-ni. Energiatõhususe toetused on saadaval muinsuskaitsealuse rekonstruktsiooni puhul.",
      },
      {
        num: "04",
        title: "III pensionisammas",
        body: "Kogumispensioni III sammas on maksusoodustusega säästuinstrument, mida saab kasutada esimese eluaseme soetamisel sissemakse katteks.",
      },
    ],
    combosEyebrow: "Rahastuse kombinatsioonid",
    combos: [
      {
        id: "standard",
        title: "Standardlaen",
        note: "Klassikaline lahendus sissemaksega 20%",
        segments: [
          { label: "Oma säästud", pct: 20, color: "#b09a7c" },
          { label: "Eluasemelaen", pct: 80, color: "#292524" },
        ],
      },
      {
        id: "kredex",
        title: "KredEx käendusega",
        note: "Sissemakse alates 10% riikliku käenduse toel",
        segments: [
          { label: "Oma säästud", pct: 10, color: "#b09a7c" },
          { label: "KredEx käendus", pct: 5, color: "#78716c" },
          { label: "Eluasemelaen", pct: 85, color: "#292524" },
        ],
      },
      {
        id: "pension",
        title: "III sambaga",
        note: "Pensionisäästud sissemaksesse + laen",
        segments: [
          { label: "III pensionisammas", pct: 10, color: "#a8956a" },
          { label: "Oma säästud", pct: 15, color: "#b09a7c" },
          { label: "Eluasemelaen", pct: 75, color: "#292524" },
        ],
      },
    ],
    calcEyebrow: "Kuumakse kalkulaator",
    selectApt: "Vali korter",
    priceLabel: "Korteri hind",
    downLabel: "Sissemakse",
    rateLabel: "Intressimäär (aastas)",
    yearsLabel: "Laenuperiood",
    yearsUnit: "aastat",
    yearsShort: "a",
    outputEyebrow: "Hinnanguline kuumakse",
    perMonth: "kuus",
    loanAmount: "Laenusumma",
    totalRepaid: (y: number) => `Kogumaksumus (${y} a)`,
    totalInterest: "Intressikulu kokku",
    disclaimer:
      "Kalkulaator annab ligikaudse hinnangu ja ei kujuta endast finantsnõustamist. Täpsete tingimuste saamiseks pöörduge oma panga poole.",
    aptLabel: (i: number) => `Korter ${i + 1}`,
  },
  en: {
    eyebrow: "Financing",
    title: "Financing your apartment purchase",
    intro:
      "Purchasing a home is a long-term commitment. Below you will find an overview of the main financing options and a calculator to help estimate your monthly outgoings.",
    infoPoints: [
      {
        num: "01",
        title: "Mortgage",
        body: "Banks typically finance up to 80–85% of the purchase price. Loan terms run from 20 to 30 years, with interest rates determined by Euribor and the bank's individual margin.",
      },
      {
        num: "02",
        title: "Down payment",
        body: "A minimum of 15–20% equity is generally required. A larger down payment means lower monthly payments and reduced interest costs over the life of the loan.",
      },
      {
        num: "03",
        title: "Government support",
        body: "The KredEx guarantee scheme can reduce the required down payment to as little as 10%. Energy efficiency subsidies may also be available for listed heritage building renovations.",
      },
      {
        num: "04",
        title: "Third pension pillar",
        body: "The third-pillar pension savings scheme is a tax-advantaged instrument that can be used towards the down payment on a first home purchase.",
      },
    ],
    combosEyebrow: "Financing combinations",
    combos: [
      {
        id: "standard",
        title: "Standard mortgage",
        note: "Classic arrangement with 20% down payment",
        segments: [
          { label: "Own savings", pct: 20, color: "#b09a7c" },
          { label: "Mortgage", pct: 80, color: "#292524" },
        ],
      },
      {
        id: "kredex",
        title: "With KredEx guarantee",
        note: "Down payment from 10% with state backing",
        segments: [
          { label: "Own savings", pct: 10, color: "#b09a7c" },
          { label: "KredEx guarantee", pct: 5, color: "#78716c" },
          { label: "Mortgage", pct: 85, color: "#292524" },
        ],
      },
      {
        id: "pension",
        title: "With third pillar",
        note: "Pension savings towards down payment + mortgage",
        segments: [
          { label: "Third pension pillar", pct: 10, color: "#a8956a" },
          { label: "Own savings", pct: 15, color: "#b09a7c" },
          { label: "Mortgage", pct: 75, color: "#292524" },
        ],
      },
    ],
    calcEyebrow: "Monthly payment calculator",
    selectApt: "Select apartment",
    priceLabel: "Apartment price",
    downLabel: "Down payment",
    rateLabel: "Interest rate (annual)",
    yearsLabel: "Loan term",
    yearsUnit: "years",
    yearsShort: "yr",
    outputEyebrow: "Estimated monthly payment",
    perMonth: "per month",
    loanAmount: "Loan amount",
    totalRepaid: (y: number) => `Total repaid (${y} yr)`,
    totalInterest: "Total interest",
    disclaimer:
      "This calculator provides an approximate estimate and does not constitute financial advice. Contact your bank for accurate terms and conditions.",
    aptLabel: (i: number) => `Apt ${i + 1}`,
  },
};

// Shared slider className
const SLIDER =
  "w-full h-px bg-stone-200 appearance-none cursor-pointer " +
  "[&::-webkit-slider-thumb]:appearance-none " +
  "[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 " +
  "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-800 " +
  "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white " +
  "[&::-webkit-slider-thumb]:shadow-sm";

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  lang?: "et" | "en";
}

export default function FinancingSection({ lang = "et" }: Props) {
  const t = CONTENT[lang];

  const [price,       setPrice]       = useState(380000);
  const [downPct,     setDownPct]     = useState(20);
  const [rate,        setRate]        = useState(5.5);
  const [years,       setYears]       = useState(25);
  const [selectedApt, setSelectedApt] = useState<string | null>(null);

  const handleAptSelect = (apt: ApartmentInfo) => {
    setSelectedApt(apt.id);
    setPrice(apt.price);
  };

  const downAmount    = Math.round(price * downPct / 100);
  const principal     = Math.max(0, price - downAmount);
  const monthly       = useMemo(() => calcMonthly(principal, rate, years), [principal, rate, years]);
  const totalPaid     = monthly * years * 12;
  const totalInterest = totalPaid - principal;

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-2xl mb-20">
          <p className="label-eyebrow text-stone-500 mb-6">{t.eyebrow}</p>
          <h2
            className="font-serif font-light text-stone-900 leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
          >
            {t.title}
          </h2>
          <p className="font-sans font-light text-stone-500 leading-[1.85] text-sm lg:text-base">
            {t.intro}
          </p>
        </div>

        {/* ── Info cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200 mb-24">
          {t.infoPoints.map((item) => (
            <div key={item.num} className="bg-white p-10 flex flex-col gap-4">
              <span className="label-eyebrow text-stone-400">{item.num}</span>
              <h3 className="font-serif text-xl font-light text-stone-900">{item.title}</h3>
              <p className="font-sans text-sm font-light text-stone-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        {/* ── Combination schemes ── */}
        <div className="mb-24">
          <p className="label-eyebrow text-stone-500 mb-10">{t.combosEyebrow}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.combos.map((combo) => (
              <div key={combo.id}>
                <p className="font-serif text-lg font-light text-stone-900 mb-1">{combo.title}</p>
                <p className="font-sans text-xs text-stone-400 mb-5 leading-relaxed">{combo.note}</p>
                <div className="flex h-8 rounded-sm overflow-hidden mb-4">
                  {combo.segments.map((seg) => (
                    <div
                      key={seg.label}
                      style={{ width: `${seg.pct}%`, backgroundColor: seg.color }}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {combo.segments.map((seg) => (
                    <div key={seg.label} className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: seg.color }} />
                      <span className="font-sans text-xs text-stone-500">{seg.label}</span>
                      <span className="font-sans text-xs text-stone-400 ml-auto">{seg.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Calculator ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Inputs */}
          <div>
            <p className="label-eyebrow text-stone-500 mb-8">{t.calcEyebrow}</p>

            {/* Apartment picker */}
            <div className="mb-8">
              <p className="font-sans text-sm text-stone-500 mb-3">{t.selectApt}</p>
              <div className="grid grid-cols-5 gap-2">
                {apartments.map((apt, i) => (
                  <button
                    key={apt.id}
                    onClick={() => handleAptSelect(apt)}
                    className={`p-3 border text-left transition-all duration-200 ${
                      selectedApt === apt.id
                        ? "border-stone-900 bg-stone-900"
                        : "border-stone-200 bg-white hover:border-stone-500"
                    }`}
                  >
                    <span className={`font-sans text-xs block mb-1 uppercase tracking-wider ${
                      selectedApt === apt.id ? "text-stone-500" : "text-stone-400"
                    }`}>
                      {t.aptLabel(i)}
                    </span>
                    <span className={`font-serif text-sm block ${
                      selectedApt === apt.id ? "text-stone-100" : "text-stone-800"
                    }`}>
                      {apt.area}
                    </span>
                    <span className={`font-sans text-xs block mt-0.5 ${
                      selectedApt === apt.id ? "text-stone-400" : "text-stone-500"
                    }`}>
                      {fmt(apt.price)} €
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div className="mb-8">
              <div className="flex justify-between items-baseline mb-3">
                <label className="font-sans text-sm text-stone-700">{t.priceLabel}</label>
                <span className="font-serif text-xl font-light text-stone-900">{fmt(price)} €</span>
              </div>
              <input
                type="range" min={150000} max={700000} step={5000} value={price}
                onChange={(e) => { setPrice(Number(e.target.value)); setSelectedApt(null); }}
                className={SLIDER}
              />
              <div className="flex justify-between mt-1.5">
                <span className="font-sans text-xs text-stone-400">150 000 €</span>
                <span className="font-sans text-xs text-stone-400">700 000 €</span>
              </div>
            </div>

            {/* Down payment */}
            <div className="mb-8">
              <div className="flex justify-between items-baseline mb-3">
                <label className="font-sans text-sm text-stone-700">{t.downLabel}</label>
                <span className="font-serif text-xl font-light text-stone-900">
                  {downPct}%&nbsp;
                  <span className="text-base text-stone-500">({fmt(downAmount)} €)</span>
                </span>
              </div>
              <input
                type="range" min={10} max={50} step={1} value={downPct}
                onChange={(e) => setDownPct(Number(e.target.value))}
                className={SLIDER}
              />
              <div className="flex justify-between mt-1.5">
                <span className="font-sans text-xs text-stone-400">10%</span>
                <span className="font-sans text-xs text-stone-400">50%</span>
              </div>
            </div>

            {/* Interest rate */}
            <div className="mb-8">
              <div className="flex justify-between items-baseline mb-3">
                <label className="font-sans text-sm text-stone-700">{t.rateLabel}</label>
                <span className="font-serif text-xl font-light text-stone-900">{rate.toFixed(1)}%</span>
              </div>
              <input
                type="range" min={2} max={10} step={0.1} value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className={SLIDER}
              />
              <div className="flex justify-between mt-1.5">
                <span className="font-sans text-xs text-stone-400">2%</span>
                <span className="font-sans text-xs text-stone-400">10%</span>
              </div>
            </div>

            {/* Loan term */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label className="font-sans text-sm text-stone-700">{t.yearsLabel}</label>
                <span className="font-serif text-xl font-light text-stone-900">{years} {t.yearsUnit}</span>
              </div>
              <input
                type="range" min={10} max={30} step={1} value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className={SLIDER}
              />
              <div className="flex justify-between mt-1.5">
                <span className="font-sans text-xs text-stone-400">10 {t.yearsShort}</span>
                <span className="font-sans text-xs text-stone-400">30 {t.yearsShort}</span>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="bg-stone-950 p-10 lg:p-12 flex flex-col justify-between min-h-[420px]">
            <div>
              <p className="label-eyebrow text-stone-500 mb-8">{t.outputEyebrow}</p>
              <p
                className="font-serif font-light text-stone-50 leading-none mb-2"
                style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}
              >
                {fmt(monthly)} €
              </p>
              <p className="font-sans text-sm text-stone-500">{t.perMonth}</p>
            </div>

            <div className="border-t border-stone-800 pt-8 mt-10 flex flex-col gap-5">
              <div className="flex justify-between">
                <span className="font-sans text-sm text-stone-500">{t.loanAmount}</span>
                <span className="font-sans text-sm text-stone-300">{fmt(principal)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-sm text-stone-500">{t.totalRepaid(years)}</span>
                <span className="font-sans text-sm text-stone-300">{fmt(totalPaid)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-sm text-stone-500">{t.totalInterest}</span>
                <span className="font-sans text-sm text-stone-300">{fmt(totalInterest)} €</span>
              </div>
            </div>

            <p className="font-sans text-xs text-stone-600 leading-relaxed mt-8">{t.disclaimer}</p>
          </div>

        </div>
      </div>
    </section>
  );
}
