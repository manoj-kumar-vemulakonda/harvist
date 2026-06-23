import { BRAND } from "@/lib/brand";

/** Wordmark + sprouting-leaf mark. Inherits currentColor. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        {/* stem */}
        <path
          d="M16 29V14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* right leaf */}
        <path
          d="M16 16c0-6 4-10 11-11 1 7-3 12-11 11Z"
          fill="currentColor"
          opacity="0.95"
        />
        {/* left leaf */}
        <path
          d="M16 20c0-4.5-3-7.5-8-8.2C7.3 17 10.5 20.7 16 20Z"
          fill="currentColor"
          opacity="0.55"
        />
      </svg>
      <span className="flex flex-col items-center leading-none">
        <span className="font-display text-lg font-bold uppercase tracking-[0.12em]">
          {BRAND.name}
        </span>
        <span className="stamp mt-0.5 text-[0.55rem] tracking-[0.3em] opacity-70">
          B2B SUPPLY
        </span>
      </span>
    </span>
  );
}
