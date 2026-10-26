import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/profile", label: "My Profile" },
];

const supportLinks = [
  { href: "/help", label: "Help Center" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

const socialLinks = [
  { href: "https://x.com", label: "Wanderlust on X", Icon: XIcon },
  {
    href: "https://www.linkedin.com",
    label: "Wanderlust on LinkedIn",
    Icon: LinkedInIcon,
  },
  {
    href: "https://www.instagram.com",
    label: "Wanderlust on Instagram",
    Icon: InstagramIcon,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0c0b0b] px-4 pb-8 pt-20 text-[#b6b6b6] sm:px-6 sm:pt-24 lg:px-20 lg:pt-[120px]">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="flex flex-col gap-4">
          <Link href="/" aria-label="Wanderlast home" className="w-fit">
            <Image
              src="/images/Wanderlast-1.png"
              alt="Wanderlast"
              width={542}
              height={80}
              className="h-10 w-auto sm:h-14 lg:h-20"
            />
          </Link>
          <p className="text-base leading-[1.6] tracking-[-0.03em] sm:text-lg lg:text-xl">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-[60px] lg:gap-x-16 lg:gap-y-12 xl:grid-cols-[400px_repeat(3,minmax(0,1fr))] xl:gap-x-[60px]">
          <div className="w-full max-w-[400px]">
            <h2 className="font-display text-xl font-normal uppercase leading-none tracking-[-0.005em] text-white">
              NEWSLETTER
            </h2>
            <p className="mt-2 text-sm leading-[1.4286] tracking-[-0.03em]">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="mt-4 flex h-12 w-full max-w-[320px] items-center bg-[#373737] px-4">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter email"
                className="h-full min-w-0 flex-1 bg-transparent text-lg leading-[1.3333] tracking-[-0.004em] text-[#b6b6b6] placeholder:text-[#b6b6b6] focus:outline-none"
              />
              <button
                type="button"
                aria-label="Subscribe to the newsletter"
                className="ml-2 flex size-6 shrink-0 items-center justify-center text-white transition-colors hover:text-brand"
              >
                <ArrowUpRight className="size-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-normal uppercase leading-none tracking-[-0.005em] text-white">
              Quick Links
            </h2>
            <ul className="mt-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base leading-[2.2222] tracking-[-0.004em] text-[#b6b6b6] transition-colors hover:text-white lg:text-lg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-normal uppercase leading-none tracking-[-0.005em] text-white">
              Support
            </h2>
            <ul className="mt-4">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base leading-[2.2222] tracking-[-0.004em] text-[#b6b6b6] transition-colors hover:text-white lg:text-lg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-normal uppercase leading-none tracking-[-0.005em] text-white">
              Contact Us
            </h2>
            <ul className="mt-4">
              <li>
                <a
                  href="tel:7869011622"
                  className="text-base leading-[2.2222] tracking-[-0.004em] text-[#b6b6b6] transition-colors hover:text-white lg:text-lg"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wandarland.com"
                  className="text-base leading-[2.2222] tracking-[-0.004em] text-[#b6b6b6] transition-colors hover:text-white lg:text-lg"
                >
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative mt-14 pt-5">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-white/10"
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-sm leading-[1.142857] tracking-[-0.004em]">
              © 2026 Wanderlust. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-white transition-colors hover:text-brand [&_svg]:size-6"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
