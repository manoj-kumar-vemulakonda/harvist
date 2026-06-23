// Single source of truth for brand identity.
// Renaming the business later is a one-line change here.
export const BRAND = {
  name: "Harvist",
  tagline: "From Nature. To Your Business.",
  // Where "Partner With Us" lead alerts are emailed. Overridable via env at deploy.
  contactEmail: "1773137manoj@gmail.com",
  city: "Hyderabad",
  // Crate-stamp lot tickets reuse these source markets.
  sourceMarket: "Bowenpally",
  serves: ["Hotels", "Restaurants", "Cloud Kitchens", "Caterers", "Institutions"],
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/produce", label: "Process" },
  { href: "/how-it-works", label: "How It Works" },
] as const;
