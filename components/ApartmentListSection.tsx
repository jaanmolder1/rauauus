"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ChatWidget from "./ChatWidget";
import type { ApartmentInfo } from "@/lib/apartmentData";

function fmtPrice(n: number) {
  return new Intl.NumberFormat("et-EE", { maximumFractionDigits: 0 }).format(n) + " €";
}

interface ApartmentListSectionProps {
  apartments: ApartmentInfo[];
  lang: "et" | "en";
}

export default function ApartmentListSection({ apartments, lang }: ApartmentListSectionProps) {
  const [selectedApt, setSelectedApt] = useState<ApartmentInfo | null>(null);

  const labels =
    lang === "et"
      ? {
          eyebrow: "Saadaolevad korterid",
          area: "Pind",
          floor: "Korrus",
          rooms: "Toad",
          price: "Hind",
          enquire: "Küsi selle korteri kohta",
          plans: "Vaata korruseplaani",
          plansHref: "/et/plaanid",
        }
      : {
          eyebrow: "Available apartments",
          area: "Area",
          floor: "Floor",
          rooms: "Rooms",
          price: "Price",
          enquire: "Enquire about this apartment",
          plans: "View floor plan",
          plansHref: "/en/plans",
        };

  return (
    <section className="bg-stone-50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="label-eyebrow mb-12">{labels.eyebrow}</p>
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
                className={`relative aspect-4/3 lg:aspect-auto overflow-hidden ${
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
                <div className="flex items-center gap-6 mb-7 pb-7 border-b border-stone-100 flex-wrap">
                  <div>
                    <p className="label-eyebrow text-stone-400 mb-1">{labels.area}</p>
                    <p className="font-serif text-2xl font-light text-stone-900">{apt.area}</p>
                  </div>
                  <div className="h-8 w-px bg-stone-200" />
                  <div>
                    <p className="label-eyebrow text-stone-400 mb-1">{labels.floor}</p>
                    <p className="font-serif text-2xl font-light text-stone-900">{apt.floor}</p>
                  </div>
                  <div className="h-8 w-px bg-stone-200" />
                  <div>
                    <p className="label-eyebrow text-stone-400 mb-1">{labels.rooms}</p>
                    <p className="font-serif text-2xl font-light text-stone-900">{apt.rooms}</p>
                  </div>
                  <div className="h-8 w-px bg-stone-200" />
                  <div>
                    <p className="label-eyebrow text-stone-400 mb-1">{labels.price}</p>
                    <p className="font-serif text-2xl font-light text-stone-900">{fmtPrice(apt.price)}</p>
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

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedApt(apt)}
                    className="inline-block font-sans text-xs tracking-widest uppercase text-stone-800 border border-stone-800 hover:bg-stone-950 hover:text-stone-100 px-7 py-3.5 transition-all duration-400 cursor-pointer"
                  >
                    {labels.enquire}
                  </button>
                  {lang === "et" && (
                    <Link
                      href={labels.plansHref}
                      className="inline-block font-sans text-xs tracking-widest uppercase text-stone-500 border border-stone-200 hover:border-stone-500 px-7 py-3.5 transition-all duration-300"
                    >
                      {labels.plans}
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedApt && (
        <ChatWidget
          apartment={selectedApt}
          lang={lang}
          onClose={() => setSelectedApt(null)}
        />
      )}
    </section>
  );
}
