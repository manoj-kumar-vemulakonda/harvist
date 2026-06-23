"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Leaf = {
  id: number;
  left: number; // vw start position
  size: number; // px
  duration: number; // s
  delay: number; // s
  drift: number; // px horizontal sway amplitude
  rotateTo: number; // deg
  opacity: number;
  spin: 1 | -1;
  tone: string; // warm autumn fill, matched to leaves.png
};

// Golden tones lifted from the leaves.png artwork for visual cohesion.
const TONES = ["#c98a3c", "#b8742a", "#d8a24e", "#a65321"];

const LEAF_COUNT = 12;

/**
 * Ambient, subtle falling-leaves background layer.
 * Fixed, full-viewport, non-interactive, sits behind content.
 * Renders nothing when the user prefers reduced motion.
 */
export default function FallingLeaves() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Defer random generation until after mount to avoid SSR hydration mismatch.
  useEffect(() => {
    setMounted(true);
  }, []);

  const leaves = useMemo<Leaf[]>(() => {
    if (!mounted) return [];
    return Array.from({ length: LEAF_COUNT }, (_, id) => {
      const size = 10 + Math.random() * 16; // 10-26px
      return {
        id,
        left: Math.random() * 100,
        size,
        duration: 14 + Math.random() * 14, // 14-28s, gentle
        delay: -Math.random() * 28, // negative so they're mid-fall on load
        drift: 24 + Math.random() * 60, // sway amplitude
        rotateTo: 120 + Math.random() * 240,
        opacity: 0.16 + Math.random() * 0.12, // 0.16-0.28
        spin: Math.random() > 0.5 ? 1 : -1,
        tone: TONES[id % TONES.length],
      };
    });
  }, [mounted]);

  if (prefersReducedMotion) return null;
  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute top-0"
          style={{ left: `${leaf.left}vw` }}
          initial={{ y: "-12vh", x: 0, rotate: 0 }}
          animate={{
            y: "112vh",
            x: [0, leaf.drift * leaf.spin, -leaf.drift * leaf.spin, 0],
            rotate: leaf.rotateTo * leaf.spin,
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: leaf.duration,
              delay: leaf.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 32 32"
            fill="none"
            style={{ opacity: leaf.opacity, color: leaf.tone }}
          >
            {/* leaf body */}
            <path
              d="M16 4C9 8 5 14 5 21c0 4 2 7 4 7 7 0 18-7 18-18 0-3-1-5-2-6-3 0-6 0-9 0Z"
              fill="currentColor"
            />
            {/* midrib vein */}
            <path
              d="M9 27C13 20 18 13 25 7"
              stroke="#7a4a16"
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.45"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
