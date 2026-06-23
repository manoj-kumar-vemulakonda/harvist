"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Liquid-glass button — ported from `docs/components/buttons.md` and re-fitted to plain
 * Tailwind + the Harvist palette (no shadcn / cva / radix).
 *
 * The glassmorphism is real: an SVG turbulence + displacement filter warps
 * whatever sits behind the button (the hero tree, the citrus band), while a
 * stack of inset shadows fakes a refracted glass edge. Tone only sets the
 * label colour so the same glass reads on cream or on citrus.
 */

const sizes = {
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
  xl: "h-14 px-10 text-base",
} as const;

type Tone = "field" | "paper" | "citrus" | "white";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof sizes;
  tone?: Tone;
}

const toneText: Record<Tone, string> = {
  field: "text-field",
  paper: "text-paper",
  citrus: "text-citrus",
  white: "text-white",
};

/** Shared glass shell — the inset-shadow refraction + warped backdrop. */
function GlassShell({
  children,
  className,
  size = "lg",
  tone = "field",
}: BaseProps) {
  return (
    <span
      className={cn(
        "group relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-lg font-editorial font-semibold",
        "transition-transform duration-200 active:scale-[0.98]",
        sizes[size],
        toneText[tone],
        className,
      )}
    >
      {/* Refracted glass edge */}
      <span
        aria-hidden
        className="absolute inset-0 z-0 rounded-lg shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(255,255,255,0.9),inset_-3px_-3px_0.5px_-3px_rgba(28,28,25,0.35),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.10),0_0_12px_rgba(255,255,255,0.15)]"
      />
      {/* Warped, blurred backdrop (the produce colours bleed through) */}
      <span
        aria-hidden
        className="absolute inset-0 isolate -z-10 overflow-hidden rounded-lg bg-paper/30"
        style={{ backdropFilter: 'url("#harvist-glass")' }}
      />
      {/* Hairline ring — brightens on hover without creating a filter stacking context */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-field/15 transition-[box-shadow,ring] duration-200 group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] group-hover:ring-white/30"
      />
      <span className="pointer-events-none z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </span>
  );
}

/** Link variant (the common case — CTAs point at /partner). */
export function LiquidLink({
  href,
  ...props
}: BaseProps & { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-field/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <GlassShell {...props} />
      <GlassFilter />
    </Link>
  );
}

/** Button variant (form submit etc.). */
export function LiquidButton({
  type = "button",
  disabled,
  onClick,
  ...props
}: BaseProps & {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-field/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-60"
    >
      <GlassShell {...props} />
      <GlassFilter />
    </button>
  );
}

/** The displacement filter — mounted once per button, hidden. */
function GlassFilter() {
  return (
    <svg aria-hidden className="absolute h-0 w-0">
      <defs>
        <filter
          id="harvist-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.04"
            numOctaves="1"
            seed="3"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="22"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </defs>
    </svg>
  );
}
