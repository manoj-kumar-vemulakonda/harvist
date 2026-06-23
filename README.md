# Harvist

A B2B lead-capture website for **Harvist** — a Hyderabad-based supplier of fresh
fruits, vegetables and leafy greens to hotels, restaurants, cloud kitchens, caterers
and tiffin services.

The site has one job: convince a professional kitchen to submit the **"Partner With
Us"** form. It's built to run **free** with **zero configuration** — the form works
in "demo mode" (logging submissions) until you add Supabase/Resend keys.

## Tech

Next.js 16 (App Router, TypeScript) · Tailwind CSS v4 · Framer Motion · Supabase ·
Resend · Zod.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

Other commands:

```bash
npm run build    # production build + type-check
npm start        # serve the production build
npm run lint
```

## Pages

| Route            | Purpose                                              |
| ---------------- | ---------------------------------------------------- |
| `/`              | Home — hero, trust bar, produce teaser, CTA          |
| `/about`         | Story, sourcing roadmap (mandi → farms), values      |
| `/produce`       | Fruits / Vegetables / Leafy Greens (the specialty)   |
| `/how-it-works`  | Register → Source → Deliver, plus FAQ                |
| `/partner`       | The lead form (primary conversion)                   |

## Lead capture & demo mode

The `/api/partner` route validates with Zod, then:

1. Inserts the lead into Supabase (if configured),
2. Emails an alert via Resend (if configured),
3. Always logs the lead to the server console.

With **no environment variables set**, steps 1–2 are skipped and the form still
returns success — so the site is fully functional out of the box. Add keys when you
want real persistence and email alerts.

### Environment variables (all optional)

Copy `.env.local.example` to `.env.local` and fill in what you have:

| Variable                     | Used for                                  |
| ---------------------------- | ----------------------------------------- |
| `SUPABASE_URL`               | Lead storage                              |
| `SUPABASE_SERVICE_ROLE_KEY`  | Lead storage (server-only)                |
| `RESEND_API_KEY`             | Email alert on each new lead              |
| `LEAD_NOTIFY_EMAIL`          | Where alerts go (defaults to brand email) |

The `partner_leads` table schema is documented in `.env.local.example`.

## Deploy free on Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected.
3. (Optional) Add the environment variables above under **Settings → Environment
   Variables**, then redeploy. Without them the site runs in demo mode.
4. Your site goes live at `https://<project>.vercel.app`.

### Adding a custom domain later

The build is domain-agnostic. When you buy a domain, add it in Vercel under
**Settings → Domains** and point its DNS at Vercel — no code changes needed.

## The 3D hero

The hero is a real **3D depth illusion** built entirely from CSS transforms (no
WebGL, no video) following [`background_design.md`](background_design.md): a
`perspective` stage with parallax planes (background glow → tree → leaves), pointer
parallax, a slow ~3% camera push and a gentle tree sway. All motion is disabled
under `prefers-reduced-motion`.

It uses two assets in [`public/`](public/): **`tree.png`** (the photoreal tree with
produce baskets — its rectangular edges are dissolved into the cream with a radial
CSS mask) and **`leaves.png`** (golden leaves on the foreground drift plane). To
swap the artwork, replace those two files. The design tokens, type and spacing all
come from [`design.md`](design.md) — the single source of design truth.

## Changing the brand

Business name, tagline, city, and the lead-alert email all live in
[`src/lib/brand.ts`](src/lib/brand.ts). Editing them updates the whole site.
