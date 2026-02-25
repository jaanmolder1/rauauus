// SVG logo component — fully vector, inherits page fonts, no raster artefacts.
// Colour tokens match the site's bronze palette.

interface LogoProps {
  /** Tailwind height class, e.g. "h-9". Width is auto. */
  className?: string;
  /** Stroke / fill colour override. Defaults to bronze-light. */
  color?: string;
}

export default function Logo({
  className = "h-9 w-auto",
  color = "#b09a7c",
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 232 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Raua Residences"
      role="img"
    >
      {/* ── Monogram circle ──────────────────────────────────────── */}
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.7" />

      {/*
        RR monogram — drawn as two overlapping R glyphs in Cormorant.
        SVG text inherits the page's loaded font (--font-cormorant via CSS var).
      */}
      <text
        x="18"
        y="31"
        fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
        fontSize="24"
        fontWeight="300"
        letterSpacing="-2"
        fill={color}
      >
        RR
      </text>

      {/* ── Thin vertical divider ────────────────────────────────── */}
      <line x1="58" y1="11" x2="58" y2="37" stroke={color} strokeWidth="1.5" opacity="0.5" />

      {/* ── Wordmark ─────────────────────────────────────────────── */}
      {/* "RAUA" */}
      <text
        x="70"
        y="22"
        fontFamily="var(--font-inter), 'Inter', system-ui, sans-serif"
        fontSize="9.5"
        fontWeight="300"
        letterSpacing="5"
        fill={color}
      >
        RAUA
      </text>

      {/* thin rule between the two lines */}
      <line x1="70" y1="26.5" x2="226" y2="26.5" stroke={color} strokeWidth="1.4" opacity="0.35" />

      {/* "RESIDENCES" */}
      <text
        x="70"
        y="37"
        fontFamily="var(--font-inter), 'Inter', system-ui, sans-serif"
        fontSize="9.5"
        fontWeight="300"
        letterSpacing="3.2"
        fill={color}
      >
        RESIDENCES
      </text>
    </svg>
  );
}
