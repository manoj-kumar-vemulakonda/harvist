import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/brand";
import { LiquidLink } from "./ui/LiquidButton";

/* ── Trust strip icons — fine line marks that sit inside circular badges ── */
const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function LeafIcon() {
  return (
    <svg {...iconProps}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg {...iconProps}>
      <path d="M14 18V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2" />
      <path d="M14 9h4l3 3v5a1 1 0 0 1-1 1h-2" />
      <circle cx="6.5" cy="18.5" r="1.5" />
      <circle cx="17.5" cy="18.5" r="1.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

const TRUST = [
  { title: "Sourced From", sub: "Trusted Farms", icon: <LeafIcon /> },
  { title: "Timely Delivery", sub: "You Can Count On", icon: <TruckIcon /> },
  { title: "Consistent Quality", sub: "Assured", icon: <ShieldIcon /> },
];

/**
 * Full-bleed editorial hero. The whole `full_background.png` scene — the tree,
 * its produce baskets and drifting leaves on warm taupe ground — IS the hero.
 * The copy sits over the image's calmer left side, overlapping into the scene so
 * the tree reads as the main subject, not a side component. A soft left-to-right
 * scrim keeps the text legible without flattening the picture.
 */
export default function Hero() {
  return (
    <section
      className="relative isolate flex min-h-screen items-center"
      style={{ backgroundColor: "#f5efe4" }}
    >
      {/* ── The scene — full-bleed background ─────────────────────────── */}
      <Image
        src="/newtrailback.png"
        alt="A flourishing tree rising from baskets of fresh fruits and vegetables — Harvist's promise of farm-fresh supply."
        fill
        priority
        sizes="100vw"
        className="-z-20"
        style={{ objectFit: "cover", objectPosition: "center 65%" }}
      />

      {/* Legibility scrim — dim the scene on the copy side */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(100deg, rgba(18,20,15,0.72) 0%, rgba(18,20,15,0.52) 35%, rgba(18,20,15,0.22) 55%, rgba(18,20,15,0) 72%)",
        }}
      />

      {/* ── Copy — overlapping into the scene ─────────────────────────── */}
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="relative z-10 max-w-xl py-20 lg:py-28">
          <p className="font-editorial italic text-sm tracking-widest text-white/90">Premium Produce · Reliable Supply</p>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.03] tracking-[-0.01em] text-white sm:text-6xl lg:text-7xl">
            From Nature.
            <br />
            <span className="text-citrus-soft italic">To Your Business.</span>
          </h1>

          <p className="mt-6 max-w-md font-editorial text-lg leading-relaxed text-white">
            {BRAND.name} supplies fresh fruits, vegetables and leafy greens to{" "}
            {BRAND.city}&rsquo;s hotels, restaurants and cloud kitchens — sourced
            from trusted farms, delivered on time, graded to plate.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <LiquidLink href="/partner" size="xl" tone="white">
              Partner With Us
              <span aria-hidden>→</span>
            </LiquidLink>
            <Link
              href="/how-it-works"
              className="font-editorial text-sm font-medium text-white underline-offset-4 transition-colors hover:underline"
            >
              See how it works
            </Link>
          </div>
        </div>
      </div>

      {/* Trust strip — over the scene like the inspiration: circled icons + fine labels */}
      <div className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-white/15 bg-gradient-to-t from-black/35 to-transparent md:block">
        <ul className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-6 sm:px-8">
          {TRUST.map((t) => (
            <li key={t.title} className="flex items-center gap-3 text-white">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ring-white/40">
                {t.icon}
              </span>
              <span className="leading-tight">
                <span className="block font-editorial text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/95">
                  {t.title}
                </span>
                <span className="block font-editorial text-[0.7rem] uppercase tracking-[0.18em] text-white/60">
                  {t.sub}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
