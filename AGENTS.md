<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Harvist — project guide

B2B lead-capture marketing site for **Harvist**, a pre-launch fresh-produce supplier
in Hyderabad selling fruits, vegetables and leafy greens to hotels, restaurants,
cloud kitchens, caterers and tiffin services. The site's single goal is one
conversion: the "Partner With Us" lead form. Built to run free (Vercel) with zero
keys via demo mode.

## Commands

- `npm run dev` — local dev server (Turbopack) at http://localhost:3000
- `npm run build` — production build + type-check (run before shipping)
- `npm start` — serve the production build
- `npm run lint` — ESLint

## Stack

Next.js 16 (App Router, TypeScript, React 19) · Tailwind CSS v4 · Framer Motion ·
Supabase (lead storage) · Resend (lead email) · Zod (validation).

## Architecture

- **`src/lib/brand.ts`** — single source of brand truth (`BRAND`, `NAV_LINKS`).
  Renaming the business or changing the alert email is a one-line edit here.
- **`src/lib/leads.ts`** — shared Zod schema + `BUSINESS_TYPES` enum + `PartnerLead`
  type. Lives in `lib` (not the API route) so the **client** `PartnerForm` can import
  the type/enum without pulling server-only modules into the client bundle. The API
  route imports the *same* schema — keep validation in one place.
- **`src/lib/supabase.ts` / `src/lib/resend.ts`** — both lazily construct their
  client and return `null`/no-op when env vars are absent ("**demo mode**"). The app
  builds and the form works (logs to console) with zero configuration.
- **`src/app/api/partner/route.ts`** — POST: validate → Supabase insert (snake_case
  columns) → Resend email → always `console.log`. Returns `{ ok, demo }`.
- **Pages** (`src/app/*/page.tsx`): Home, About, Produce, How It Works, Partner.
  Every CTA points to `/partner`. Pages compose shared components; copy is inline.

## Design direction — "Refined Harvest" (minimalist + 3D)

Authoritative spec: **`design.md`** (root). A premium, calm, editorial look that
bridges raw nature with B2B reliability — minimalism + subtle glassmorphism,
ample whitespace, and a real **3D hero**. Colour follows 60-30-10: earthy cream
dominates, sage green carries brand/actions, burnt-citrus is the sparing accent.
If `design.md` and this file ever disagree, **`design.md` wins**.

- The hero is a genuine **3D depth illusion** (NOT a flat image), built per
  `background_design.md`: a `perspective` stage with parallax layers
  (bg glow → tree → leaves), pointer parallax, a slow ~3% camera push, and a
  gentle tree sway — all CSS transforms (no WebGL/video). Real assets live in
  `/public`: **`tree.png`** (photoreal tree + produce baskets; its rectangular
  edges are dissolved with a radial CSS mask) and **`leaves.png`** (golden leaves,
  foreground drift plane). Source copies are in `Background_images/`.

## Design system (Tailwind v4 — CSS-first)

No `tailwind.config.ts`. Tokens are declared with `@theme` in `src/app/globals.css`
straight from `design.md` and consumed as utilities. Key tokens: `bg-paper`
(#fdf9f5 surface), `bg-paper-deep`/`bg-card` (tonal layers), `text-field` (#42573b
sage primary), `field-soft`, `text-husk` (#1c1c19 ink), `text-muted` (#444840),
`border-stone` (outline), `bg-citrus` (#a65321 accent), `citrus-soft`.

- **Typeface: Manrope, exclusively** (`--font-*` all map to it). No serif, no mono.
- **Shape language is soft, never pills:** `rounded-lg` (8px) for buttons/inputs,
  `rounded-2xl` for cards/bands. Don't reintroduce `rounded-full` on buttons.
- **Depth via tonal layering + `.glass`**, not heavy drop shadows.
- **Signature motif:** the `.stamp` `Eyebrow` (Manrope small-caps, wide tracking)
  encoding real supply info, e.g. `LOT 03 · LEAFY GREENS`. Reuse it.
- **Restraint:** keep sections airy and cream. The single saturated moment is the
  citrus `CtaBand`. Don't add more high-contrast blocks.
- **Quality floor:** responsive, visible `:focus-visible`, semantic HTML, and
  `prefers-reduced-motion` disables the hero motion + FallingLeaves + Reveal
  (handled in those components — preserve it).

## Env (all optional — see `.env.local.example`)

`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`.
Without them the form runs in demo mode. The `partner_leads` table schema is
documented in `.env.local.example`.
