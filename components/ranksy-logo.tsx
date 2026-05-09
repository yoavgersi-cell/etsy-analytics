export function RanksyLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left ear outer */}
      <polygon points="3,18 11,2 20,15" fill="#C8591A" />
      {/* Right ear outer */}
      <polygon points="37,18 29,2 20,15" fill="#C8591A" />
      {/* Left ear inner */}
      <polygon points="7,16 12,6 19,14" fill="#ffedd5" />
      {/* Right ear inner */}
      <polygon points="33,16 28,6 21,14" fill="#ffedd5" />
      {/* Head */}
      <circle cx="20" cy="24" r="14" fill="#C8591A" />
      {/* Muzzle */}
      <ellipse cx="20" cy="28.5" rx="8" ry="6" fill="#ffedd5" />
      {/* Left eye white */}
      <circle cx="15" cy="22" r="3" fill="white" />
      {/* Right eye white */}
      <circle cx="25" cy="22" r="3" fill="white" />
      {/* Left pupil */}
      <circle cx="15.5" cy="22.5" r="1.8" fill="#1c1917" />
      {/* Right pupil */}
      <circle cx="25.5" cy="22.5" r="1.8" fill="#1c1917" />
      {/* Left eye shine */}
      <circle cx="16.2" cy="21.5" r="0.6" fill="white" />
      {/* Right eye shine */}
      <circle cx="26.2" cy="21.5" r="0.6" fill="white" />
      {/* Nose */}
      <ellipse cx="20" cy="27" rx="2" ry="1.4" fill="#9a3412" />
      {/* Mouth left */}
      <path d="M18 28.5 Q20 30.5 22 28.5" stroke="#9a3412" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  )
}
