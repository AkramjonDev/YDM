import Link from "next/link";
import { useId } from "react";

// Inline copy of /public/yd-logo.svg (`tone="light"`: /public/yd-logo-light.svg,
// for dark backgrounds). Rendered inline (not via <img>) so the wordmark can
// use the page's Montserrat; keep them in sync.
const tones = {
  dark: { ink: "#021c56", gold: "#c9a24a" },
  light: { ink: "#ffffff", gold: "#d9b96c" },
};

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: keyof typeof tones;
}) {
  const gradientId = useId();
  const { ink, gold } = tones[tone];

  return (
    <Link href="/" className="shrink-0 rounded-md">
      <svg
        viewBox="0 0 268 82"
        role="img"
        aria-label="Oʻzbekiston Yoshlar Diplomatiya Markazi"
        className={className}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3b95ea" />
            <stop offset="1" stopColor="#0a6fd6" />
          </linearGradient>
        </defs>
        <g fill={ink}>
          <polygon points="2,6 25,6 52,44 34,44" />
          <polygon points="57,6 80,6 52,44 34,44" />
          <rect x="34" y="43" width="18" height="33" />
        </g>
        <path
          d="M80 6 H84 A35 35 0 0 1 84 76 H54 V62 H84 A21 21 0 0 0 84 20 H69.7 Z"
          fill={`url(#${gradientId})`}
        />
        <g
          aria-hidden
          textAnchor="middle"
          style={{ fontFamily: "var(--font-montserrat), Montserrat, Inter, sans-serif" }}
        >
          <text x="198" y="16" fontSize="8.5" fontWeight="600" letterSpacing="2.6" fill={gold}>
            OʻZBEKISTON
          </text>
          <text x="198" y="36" fontSize="17" fontWeight="700" letterSpacing="1.4" fill={ink}>
            YOSHLAR
          </text>
          <text x="198" y="56" fontSize="16" fontWeight="700" letterSpacing="1" fill={ink}>
            DIPLOMATIYA
          </text>
          <text x="198" y="71" fontSize="8.5" fontWeight="600" letterSpacing="2.6" fill={gold}>
            MARKAZI
          </text>
        </g>
      </svg>
    </Link>
  );
}
