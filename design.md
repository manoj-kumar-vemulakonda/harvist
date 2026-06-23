---
name: Organic Premium B2B
colors:
  surface: '#fdf9f5'
  surface-dim: '#ddd9d6'
  surface-bright: '#fdf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3ef'
  surface-container: '#f1ede9'
  surface-container-high: '#ebe7e4'
  surface-container-highest: '#e6e2de'
  on-surface: '#1c1c19'
  on-surface-variant: '#444840'
  inverse-surface: '#31302e'
  inverse-on-surface: '#f4f0ec'
  outline: '#747870'
  outline-variant: '#c4c8be'
  surface-tint: '#4f6447'
  primary: '#42573b'
  on-primary: '#ffffff'
  primary-container: '#5a7052'
  on-primary-container: '#d9f3cd'
  inverse-primary: '#b5ceaa'
  secondary: '#705a49'
  on-secondary: '#ffffff'
  secondary-container: '#f8dac5'
  on-secondary-container: '#755e4d'
  tertiary: '#873c09'
  on-tertiary: '#ffffff'
  tertiary-container: '#a65321'
  on-tertiary-container: '#ffe6dc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1eac5'
  primary-fixed-dim: '#b5ceaa'
  on-primary-fixed: '#0d2009'
  on-primary-fixed-variant: '#374c31'
  secondary-fixed: '#fbddc7'
  secondary-fixed-dim: '#dec1ac'
  on-secondary-fixed: '#28180b'
  on-secondary-fixed-variant: '#574333'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#783100'
  background: '#fdf9f5'
  on-background: '#1c1c19'
  surface-variant: '#e6e2de'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 12px
  stack-md: 32px
  stack-lg: 64px
---

## Brand & Style
The design system is rooted in the concept of "Refined Harvest." It bridges the gap between raw, organic nature and professional B2B reliability. The aesthetic is sophisticated and editorial, utilizing high-end photography and ample whitespace to convey transparency and quality.

The visual style blends **Minimalism** with subtle **Glassmorphism** to create a sense of depth and modernity. It avoids the cluttered look of traditional logistics platforms in favor of a "lifestyle" approach that appeals to high-end restaurant buyers and boutique grocery chains. The mood is calm, trustworthy, and uncompromisingly fresh.

## Colors
This palette is derived directly from the natural lifecycle of produce.
- **Primary (Sage Green):** A muted, professional green used for primary actions and brand presence.
- **Secondary (Earth Brown):** A deep, grounding tone for typography and structural elements.
- **Neutral (Earthy Cream):** The "paper" of the system, providing a warmer, more organic base than pure white.
- **High-Contrast Accent:** A vibrant, citrus-inspired orange used sparingly for "New Arrivals," "Peak Season" highlights, and critical alerts.

Color application should follow a 60-30-10 distribution, where the Earthy Cream dominates the background to maintain an airy, premium feel.

## Typography
Manrope is used exclusively to maintain a clean, modernist edge. The type scale is generous, prioritizing legibility and a sense of "prestige."

- **Display & Headlines:** Use tight letter spacing and heavier weights to create an authoritative, editorial presence.
- **Body Text:** Use regular weights with a slightly increased line height (1.6) to ensure comfort during long inventory browsing sessions.
- **Labels:** Small caps and increased tracking are used for metadata, such as SKU numbers or farm locations, to distinguish them from descriptive copy.

## Layout & Spacing
The layout follows a **Fixed-Grid** philosophy for desktop to maintain a premium, catalog-like feel, centering the content with wide margins. 

- **Grid:** A 12-column system on desktop, collapsing to 4 columns on mobile.
- **Rhythm:** An 8px baseline grid dictates all vertical spacing.
- **Breathing Room:** Use the `stack-lg` (64px) spacing between major sections to prevent the UI from feeling "crowded" or utilitarian.
- **Adaptive Rules:** On mobile, margins reduce significantly, but gutters remain at 24px to ensure high-contrast produce imagery has room to shine.

## Elevation & Depth
This design system utilizes **Glassmorphism** and **Tonal Layering** instead of heavy drop shadows.

- **Surface Tiers:** Backgrounds use the Earthy Cream. Content cards use a slightly lighter "Off-White" or a 1px Sage Green border at 10% opacity.
- **Overlays:** Navigation bars and modal backdrops utilize a backdrop-blur (12px to 20px) with a semi-transparent Earthy Cream tint. This allows produce colors to bleed through subtly, maintaining the "organic" atmosphere.
- **Highlights:** For "Premium" tier products, use a subtle inner-glow rather than an outer shadow to give the appearance of the card being softly illuminated from within.

## Shapes
The shape language is **Soft**. This avoids the rigidity of sharp corners (which feel overly industrial) and the playfulness of pill-shapes (which feel too consumer-facing).

- **Standard Radius:** 0.25rem (4px) for small inputs and checkboxes.
- **Large Radius:** 0.5rem (8px) for product cards and main containers.
- **Image Treatment:** Produce photography should always feature the standard 8px radius to soften the visual impact and maintain consistency with the UI containers.

## Components
- **Buttons:** Primary buttons use the Sage Green background with white text. Secondary buttons use a transparent background with a 1px Earth Brown border. All buttons feature a subtle 200ms color transition on hover.
- **Produce Chips:** Small, tonal tags (e.g., "Organic," "Local," "Fair Trade") use a 10% opacity Sage Green background with 100% opacity Sage text.
- **Input Fields:** Minimalist design with a 1px bottom-border only in Earth Brown. When focused, the border transitions to Sage Green with a very soft 4px glow.
- **Glass Cards:** Used for seasonal highlights. Features a `backdrop-filter: blur(10px)` and a white inner-stroke (0.5px) to simulate a glass edge.
- **Inventory Lists:** High-density lists for B2B ordering should use alternating Earthy Cream and slightly darker cream rows for better scanning, keeping text in Earth Brown.
- **Produce Cards:** Feature a large, high-resolution image at the top, followed by a clear, bold price in the High-Contrast Accent color.