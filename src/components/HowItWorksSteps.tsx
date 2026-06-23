"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { BRAND } from "@/lib/brand";

const STEPS = [
  {
    n: "01",
    title: "You register",
    body: "Tell us your business, your usual list, and your delivery window through the Partner form. No commitment, no platform fees.",
  },
  {
    n: "02",
    title: "We source fresh",
    body: `Each morning we hand-pick your order from trusted farms and markets, grading and checking quality before anything is packed.`,
  },
  {
    n: "03",
    title: "We deliver",
    body: `Your crates reach your kitchen on schedule across ${BRAND.city} — the same grade, every time, so your prep never waits.`,
  },
];

/**
 * Scroll-linked vertical timeline. A sienna "mercury" line connects each box to
 * the next; as a box scrolls into view the line drops into it (glowing bead on
 * the leading edge) and the box fills with sienna "liquid" rising from the
 * bottom while it lights up — and recedes/un-lights in reverse on the way back.
 * Honours prefers-reduced-motion: everything renders full and static.
 *
 * Numbered markers are justified here — this is a real ordered sequence.
 */
export default function HowItWorksSteps() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <ol className="relative mx-auto max-w-2xl" style={{ perspective: "1200px" }}>
      {STEPS.map((step, i) => (
        <Step
          key={step.n}
          step={step}
          index={i}
          isHovered={hovered === i}
          anyHovered={hovered !== null}
          onHover={() => setHovered(i)}
          onLeave={() => setHovered(null)}
        />
      ))}
    </ol>
  );
}

function Step({
  step,
  index,
  isHovered,
  anyHovered,
  onHover,
  onLeave,
}: {
  step: (typeof STEPS)[number];
  index: number;
  isHovered: boolean;
  anyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const reduce = useReducedMotion();
  const rowRef = useRef<HTMLLIElement>(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 85%", "center 55%"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });

  const lineHeight = useTransform(p, [0, 0.5], ["0%", "100%"]);
  const liquidHeight = useTransform(p, [0.4, 1], ["0%", "100%"]);

  const [lit, setLit] = useState(false);
  useMotionValueEvent(p, "change", (v) => setLit(v >= 0.45));
  const isLit = reduce || lit;

  function cardAnim() {
    if (reduce) return {};
    if (!anyHovered) return { y: 0, scale: 1, opacity: 1 };
    if (isHovered) return { y: -14, scale: 1.02, opacity: 1 };
    return { y: 0, scale: 0.98, opacity: 0.55 };
  }

  return (
    <li ref={rowRef} className="relative">
      {/* Connector segment that joins the previous box to this one. */}
      {index > 0 && (
        <div
          aria-hidden
          className="relative mx-auto h-24 w-0.5 rounded-full bg-stone/50"
        >
          {reduce ? (
            <div className="absolute inset-x-0 top-0 h-full rounded-full bg-citrus" />
          ) : (
            <motion.div
              style={{ height: lineHeight }}
              className="absolute inset-x-0 top-0 rounded-full bg-citrus"
            >
              <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-citrus shadow-[0_0_14px_4px_rgba(168,69,31,0.7)] ring-2 ring-card" />
            </motion.div>
          )}
        </div>
      )}

      {/* Step card with rising sienna liquid fill. */}
      <motion.div
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        animate={cardAnim()}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ position: "relative", zIndex: isHovered ? 20 : 1 }}
        className={`relative overflow-hidden rounded-2xl border bg-card p-7 transition-colors duration-300 ${
          isLit ? "border-citrus/40" : "border-stone/50"
        }`}
      >
        {/* Liquid — sits behind the content; text stays readable above it. */}
        {reduce ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-citrus/60" />
        ) : (
          <motion.div
            style={{ height: liquidHeight }}
            className="pointer-events-none absolute inset-x-0 bottom-0 bg-citrus/65"
          >
            <span className="absolute inset-x-0 top-0 h-[2px] bg-citrus/90" />
          </motion.div>
        )}

        {/* Content above the liquid. */}
        <div className="relative z-10">
          <span
            className={`font-display text-5xl font-bold transition-colors duration-300 ${
              isLit ? "text-citrus" : "text-citrus/30"
            }`}
          >
            {step.n}
          </span>
          <h3
            className={`mt-3 font-display text-xl font-bold transition-colors duration-300 ${
              isLit ? "text-citrus" : "text-field"
            }`}
          >
            {step.title}
          </h3>
          <p className="mt-3 font-editorial text-sm leading-relaxed text-husk/70">
            {step.body}
          </p>
        </div>
      </motion.div>
    </li>
  );
}
