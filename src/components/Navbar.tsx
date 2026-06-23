"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/brand";
import Logo from "./Logo";
import { MenuToggleIcon } from "./ui/menu-toggle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Logo — anchored to the top of the page (absolute, not fixed), so it
          scrolls away with the page and never re-appears mid-scroll. Links home. */}
      <Link
        href="/"
        className={`absolute left-6 top-4 z-50 sm:left-8 ${
          pathname === "/"
            ? "text-citrus-soft drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
            : "text-citrus drop-shadow-[0_1px_2px_rgba(28,28,25,0.22)]"
        }`}
        aria-label="Harvist home"
      >
        <Logo />
      </Link>

      {/* Menu toggle — anchored to the top of the page (absolute, not fixed) so
          it scrolls away with the logo and stays put at the page top. */}
      <div
        className={`absolute right-6 top-4 z-50 sm:right-8 ${
          pathname === "/" ? "text-citrus-soft" : "text-citrus"
        }`}
      >
        {/* 3-line animated toggle (docs/components/menutoggleanimation.md) opening the
            Radix dropdown (docs/components/dropdown.md), populated with our nav links. */}
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-current outline-none"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <MenuToggleIcon open={open} strokeWidth={2.4} className="size-6" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" sideOffset={10} className="w-52">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <DropdownMenuItem key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={active ? "font-medium text-field" : "text-husk/80"}
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href="/partner"
                className="justify-center rounded-md bg-field font-semibold text-paper focus:bg-field-soft focus:text-paper"
              >
                Partner With Us
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
