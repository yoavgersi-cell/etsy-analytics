/**
 * Listifly wordmark icon — "List + Fly"
 *
 * Concept: Three horizontal bars (the listing / list) on the left,
 * a clean upward arrow on the right (the "fly" / growth).
 * Reads as: your listing is rising.
 *
 * Brand color: deep nordic blue #2d1f7a (matches --color-brand)
 * Works on white, surface, and dark backgrounds.
 */
export function ListiflyLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Listifly"
    >
      {/* Bar 1 — full width (title line) */}
      <rect x="4" y="10" width="19" height="4" rx="2" fill="#2d1f7a" />

      {/* Bar 2 — medium (tags/description line) */}
      <rect x="4" y="18" width="14" height="4" rx="2" fill="#2d1f7a" opacity="0.55" />

      {/* Bar 3 — short (third line) */}
      <rect x="4" y="26" width="9" height="4" rx="2" fill="#2d1f7a" opacity="0.28" />

      {/* Upward arrow — the "fly" */}
      <line x1="30" y1="31" x2="30" y2="12" stroke="#2d1f7a" strokeWidth="3.2" strokeLinecap="round" />
      <polyline
        points="25,17 30,12 35,17"
        stroke="#2d1f7a"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
