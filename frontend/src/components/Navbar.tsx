"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  {href: "/add-destination", label: "Add Destination"},
  { href: "/my-bookings", label: "My Bookings" },
];

const accountLinks = [
  { href: "/profile", label: "Profile" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Sign Up" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav
        aria-label="Main navigation"
        className="grid h-16 grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6 lg:h-[88px] lg:px-10"
      >
        <div className="flex items-center">
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium tracking-[0.005em] transition-colors hover:text-brand ${
                  isActive(pathname, link.href)
                    ? "text-brand"
                    : "text-[#0c0b0b]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex size-9 items-center justify-center text-[#0c0b0b] lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <Link
          href="/"
          aria-label="Wanderlast home"
          className="justify-self-center"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
            className="h-6 w-auto"
          />
        </Link>

        <div className="flex items-center justify-end">
          <div className="hidden items-center gap-8 lg:flex">
            <Link
              href="/profile"
              className={`flex items-center gap-1 text-base font-medium tracking-[0.005em] transition-colors hover:text-brand ${
                isActive(pathname, "/profile")
                  ? "text-brand"
                  : "text-[#0c0b0b]"
              }`}
            >
              <User className="size-4" aria-hidden="true" />
              Profile
            </Link>
            <Link
              href="/login"
              className="text-base font-medium tracking-[0.005em] text-[#0c0b0b] transition-colors hover:text-brand"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-base font-medium tracking-[0.005em] text-[#0c0b0b] transition-colors hover:text-brand"
            >
              Sign Up
            </Link>
          </div>

          <Link
            href="/profile"
            aria-label="Profile"
            className="flex size-9 items-center justify-center text-[#0c0b0b] lg:hidden"
          >
            <User className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-black/5 bg-white px-4 py-3 sm:px-6 lg:hidden"
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2.5 text-base font-medium transition-colors hover:text-brand ${
                  isActive(pathname, link.href)
                    ? "text-brand"
                    : "text-[#0c0b0b]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 h-px bg-black/5" />

            {accountLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 py-2.5 text-base font-medium text-[#0c0b0b] transition-colors hover:text-brand"
                onClick={() => setMenuOpen(false)}
              >
                {link.label === "Profile" && (
                  <User className="size-4" aria-hidden="true" />
                )}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
