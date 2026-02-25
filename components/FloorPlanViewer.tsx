"use client";

/**
 * FloorPlanViewer
 * ───────────────
 * Displays interactive architectural floor plans.
 *
 * Layout:
 *   Left  — vertical "KORRUS" label + floor-number buttons (3 → 2 → 1 → K)
 *   Right — floor plan image with transparent SVG overlay for hover zones
 *
 * Interaction:
 *   Hover  → zone fills with bronze tint; inline label shows apt name + area
 *   Click  → opens apartment detail modal
 *
 * ZONE COORDINATES
 *   All polygon `points` use the SVG viewBox "0 0 842 595" (A4 landscape).
 *   To fine-tune: open the floor plan SVG in a browser, overlay this SVG,
 *   and adjust the coordinate values until polygons align with the walls.
 */

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { apartments } from "@/lib/apartmentData";
import type { ApartmentInfo } from "@/lib/apartmentData";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Zone {
  aptId: string;
  /** SVG polygon points: "x1,y1 x2,y2 x3,y3 …" in the 842×595 viewBox */
  points: string;
}

interface FloorDef {
  id: string;
  label: string;       // "1. korrus"
  shortLabel: string;  // "1" / "K"
  svgSrc: string;
  zones: Zone[];
}

// ── Floor data (ordered top → bottom for the vertical picker) ─────────────────

const FLOORS: FloorDef[] = [
  {
    id: "floor-3",
    label: "3. korrus",
    shortLabel: "3",
    svgSrc: "/floor-plans/036_EP_AR-5-03_3-korruse-plaan.svg",
    zones: [
      // Korter 5 — entire penthouse floor including terrace below main body
      { aptId: "apt-5", points: "277,90 755,90 755,540 277,540" },
    ],
  },
  {
    id: "floor-2",
    label: "2. korrus",
    shortLabel: "2",
    svgSrc: "/floor-plans/036_EP_AR-5-02_2-korruse-plaan.svg",
    zones: [
      // Korter 3 — left half (100 m²), slightly wider than K4
      { aptId: "apt-3", points: "277,88 550,88 550,490 277,490" },
      // Korter 4 — right half (89 m²)
      { aptId: "apt-4", points: "550,88 790,88 790,490 550,490" },
    ],
  },
  {
    id: "floor-1",
    label: "1. korrus",
    shortLabel: "1",
    svgSrc: "/floor-plans/036_EP_AR-5-01_1-korruse-plaan.svg",
    zones: [
      // Korter 1 — left half (113 m²), slightly wider than K2
      { aptId: "apt-1", points: "277,88 550,88 550,490 277,490" },
      // Korter 2 — right half (99 m²)
      { aptId: "apt-2", points: "550,88 790,88 790,490 550,490" },
    ],
  },
  {
    id: "floor-cellar",
    label: "Kelder",
    shortLabel: "K",
    svgSrc: "/floor-plans/036_EP_AR-5-04_keldri-plaan.svg",
    zones: [], // No residential apartments
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const APT_MAP = Object.fromEntries(apartments.map((a) => [a.id, a]));

function fmtPrice(n: number) {
  return new Intl.NumberFormat("et-EE", { maximumFractionDigits: 0 }).format(n) + " €";
}

/** Returns the arithmetic centroid of a polygon (for label placement). */
function centroid(points: string): { x: number; y: number } {
  const pts = points.trim().split(/\s+/).map((p) => {
    const [x, y] = p.split(",").map(Number);
    return { x, y };
  });
  return {
    x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
    y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
  };
}

// ── Apartment modal ───────────────────────────────────────────────────────────

function ApartmentModal({
  apt,
  onClose,
}: {
  apt: ApartmentInfo;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center border border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-colors duration-200"
          aria-label="Sulge"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1l10 10M11 1L1 11" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={apt.imageSrc}
            alt={apt.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-950/40 to-transparent" />
          <div className="absolute bottom-5 left-6">
            <span className="label-eyebrow text-stone-300">{apt.number}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10">
          <div className="flex flex-wrap gap-6 mb-7 pb-7 border-b border-stone-100">
            {[
              { label: "Pind", value: apt.area },
              { label: "Korrus", value: apt.floor },
              { label: "Toad", value: apt.rooms },
              { label: "Hind", value: fmtPrice(apt.price) },
            ].map((s) => (
              <div key={s.label}>
                <p className="label-eyebrow text-stone-400 mb-0.5">{s.label}</p>
                <p className="font-serif text-xl font-light text-stone-900">{s.value}</p>
              </div>
            ))}
          </div>

          <h2
            className="font-serif font-light text-stone-900 leading-snug mb-5"
            style={{ fontSize: "clamp(1.4rem, 2vw, 1.875rem)" }}
          >
            {apt.title}
          </h2>

          <p className="font-sans font-light text-stone-500 leading-relaxed text-sm mb-8">
            {apt.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {apt.features.map((f) => (
              <span
                key={f}
                className="font-sans text-xs tracking-wide text-stone-600 bg-stone-50 border border-stone-100 px-3 py-1"
              >
                {f}
              </span>
            ))}
          </div>

          <Link
            href="/et/kontakt"
            onClick={onClose}
            className="inline-block font-sans text-xs tracking-widest uppercase bg-stone-950 text-stone-50 hover:bg-stone-800 px-8 py-3.5 transition-all duration-300"
          >
            Küsi infot selle korteri kohta
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function FloorPlanViewer() {
  const [activeFloorId, setActiveFloorId] = useState<string>("floor-1");
  const [hoveredAptId, setHoveredAptId]   = useState<string | null>(null);
  const [modalApt,     setModalApt]       = useState<ApartmentInfo | null>(null);

  const activeFloor = FLOORS.find((f) => f.id === activeFloorId)!;

  const switchFloor = useCallback((id: string) => {
    setActiveFloorId(id);
    setHoveredAptId(null);
  }, []);

  return (
    <>
      {/*
        ── Outer wrapper ──────────────────────────────────────────────────────
        On mobile: floor picker on top (horizontal row), plan below.
        On md+:    floor picker on left (vertical column), plan fills the rest.
      */}
      <div className="flex flex-col md:flex-row w-full">

        {/* ── Floor picker ─────────────────────────────────────────────────── */}
        <div className="flex md:flex-col items-center md:items-start gap-0 px-0 md:pr-12 pb-6 md:pb-0 md:pt-2">
          <p
            className="label-eyebrow text-stone-400 mr-5 md:mr-0 md:mb-6 self-center md:self-auto"
            style={{ letterSpacing: "0.2em" }}
          >
            Korrus
          </p>

          {/* Floor buttons */}
          <div className="flex md:flex-col gap-1.5">
            {FLOORS.map((floor) => {
              const isActive = activeFloorId === floor.id;
              return (
                <button
                  key={floor.id}
                  onClick={() => switchFloor(floor.id)}
                  aria-label={floor.label}
                  className={`
                    w-11 h-11 flex items-center justify-center
                    font-serif text-xl font-light
                    transition-all duration-200
                    ${isActive
                      ? "bg-stone-950 text-stone-100"
                      : "text-stone-400 hover:text-stone-900 hover:bg-stone-100"
                    }
                  `}
                >
                  {floor.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Floor plan ───────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-hidden bg-stone-50 border border-stone-200">
          {/*
            Aspect-ratio container (842 : 595 = A4 landscape).
            Holds the floor plan image + transparent SVG overlay.
          */}
          <div
            className="relative w-full"
            style={{ paddingBottom: `${(595 / 842) * 100}%` }}
            onMouseLeave={() => setHoveredAptId(null)}
          >
            {/* Base layer — the architectural drawing */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeFloor.svgSrc}
              alt={`${activeFloor.label} plaan`}
              className="absolute inset-0 w-full h-full object-contain select-none"
              draggable={false}
            />

            {/* Interactive overlay — zones + labels */}
            {activeFloor.zones.length > 0 && (
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 842 595"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>
                  {/* Soft glow around hovered zone */}
                  <filter id="zone-glow" x="-15%" y="-15%" width="130%" height="130%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
                    <feFlood floodColor="#b09a7c" floodOpacity="0.35" result="colour" />
                    <feComposite in="colour" in2="blur" operator="in" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {activeFloor.zones.map((zone) => {
                  const isHovered = hoveredAptId === zone.aptId;
                  const apt       = APT_MAP[zone.aptId];
                  const { x: cx, y: cy } = centroid(zone.points);

                  return (
                    <g
                      key={zone.aptId}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoveredAptId(zone.aptId)}
                      onMouseLeave={() => setHoveredAptId(null)}
                      onClick={() => apt && setModalApt(apt)}
                    >
                      {/* Highlight polygon */}
                      <polygon
                        points={zone.points}
                        fill="#b09a7c"
                        fillOpacity={isHovered ? 0.18 : 0}
                        stroke="#b09a7c"
                        strokeWidth={isHovered ? 1.5 : 0}
                        strokeOpacity={isHovered ? 0.55 : 0}
                        filter={isHovered ? "url(#zone-glow)" : "none"}
                        style={{ transition: "fill-opacity 0.2s, stroke-opacity 0.2s" }}
                      />

                      {/*
                        Invisible hit-target (always catches mouse even when not hovered).
                        Needed so the polygon is hoverable even when fillOpacity = 0.
                      */}
                      <polygon
                        points={zone.points}
                        fill="transparent"
                        stroke="none"
                      />

                      {/* Inline hover label — appears centred inside the zone */}
                      {isHovered && apt && (
                        <g style={{ pointerEvents: "none" }}>
                          {/* Dark pill background */}
                          <rect
                            x={cx - 62}
                            y={cy - 26}
                            width={124}
                            height={50}
                            rx={2}
                            fill="rgba(12, 10, 9, 0.88)"
                          />
                          {/* Apartment name */}
                          <text
                            x={cx}
                            y={cy - 6}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="rgba(255,255,255,0.95)"
                            fontFamily="Georgia, 'Times New Roman', serif"
                            fontSize="12"
                            fontWeight="300"
                            letterSpacing="0.5"
                          >
                            {apt.number}
                          </text>
                          {/* Area */}
                          <text
                            x={cx}
                            y={cy + 11}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#b09a7c"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontSize="10"
                            letterSpacing="1"
                          >
                            {apt.area}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            )}

            {/* Subtle hint — only if zones exist, bottom of plan */}
            {activeFloor.zones.length > 0 && (
              <p className="absolute bottom-3 right-4 font-sans text-[10px] text-stone-400 tracking-wide pointer-events-none select-none">
                Hõljuta korteri kohal · kliki detailide vaatamiseks
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalApt && (
        <ApartmentModal apt={modalApt} onClose={() => setModalApt(null)} />
      )}
    </>
  );
}
