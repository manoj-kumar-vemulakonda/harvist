import Link from "next/link";
import Logo from "@/components/Logo";
import { BRAND, NAV_LINKS } from "@/lib/brand";

/**
 * Compact, minimalist footer — a single calm band on deep forest green.
 * Micro-interaction: a citrus underline that wipes in from the left on hover
 * (200ms ease-out, disabled under prefers-reduced-motion). Server component.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-field text-paper">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
        {/* Brand + nav */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Link href="/" aria-label={`${BRAND.name} home`} className="text-paper">
            <Logo className="text-paper" />
          </Link>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/partner" accent>
                  Partner With Us
                </FooterLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Hairline + fine print */}
        <div className="mt-8 flex flex-col items-center gap-3 border-t border-paper/15 pt-6 text-xs text-paper/55 sm:flex-row sm:justify-between">
          <p className="stamp">
            © {year} {BRAND.name} · {BRAND.city}
          </p>
          <p className="italic">Built fresh.</p>
        </div>
      </div>
    </footer>
  );
}

/** Inline link with a citrus underline that wipes in from the left on hover. */
function FooterLink({
  href,
  children,
  accent = false,
}: {
  href: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-block transition-colors duration-200 ${
        accent
          ? "font-medium text-citrus-soft hover:text-paper"
          : "text-paper/80 hover:text-paper"
      }`}
    >
      {children}
      <span
        aria-hidden
        className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 motion-reduce:hidden ${
          accent ? "bg-paper" : "bg-citrus-soft"
        }`}
      />
    </Link>
  );
}
