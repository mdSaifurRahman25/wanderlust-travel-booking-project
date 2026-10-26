import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-[#0c0b0b] px-4 sm:px-6 lg:px-20"
    >
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="cta-overlay"
            x1="2.4755681800143408"
            y1="0.9511363600286816"
            x2="0.47556818001434076"
            y2="0"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#1a1a1a" stopOpacity="1" />
            <stop
              offset="0.3284247815608978"
              stopColor="#1a1a1a"
              stopOpacity="0.4"
            />
            <stop
              offset="0.46024397015571594"
              stopColor="#1a1a1a"
              stopOpacity="0.4"
            />
            <stop offset="1" stopColor="#1a1a1a" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-overlay)" />
      </svg>

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center gap-8 py-20 text-center sm:py-24 lg:gap-10 lg:py-[120px]">
        <div className="flex flex-col gap-2 lg:gap-3">
          <h2
            id="cta-heading"
            className="font-display text-[clamp(2.25rem,4.17vw,3.75rem)] font-normal leading-none tracking-[-0.03em] text-white"
          >
            Ready to Start Your Journey?
          </h2>
          <p className="text-base leading-[1.6] tracking-[-0.03em] text-[#edfcff] sm:text-lg lg:text-xl">
            Join thousands of travelers who have discovered the world with us
          </p>
        </div>

        <Link
          href="/destinations"
          className="inline-flex h-12 w-full items-center justify-center gap-6 whitespace-nowrap bg-white px-6 text-base font-medium tracking-[0.005em] text-[#0c0b0b] uppercase transition-colors hover:bg-white/90 sm:h-14 sm:w-auto sm:min-w-[279px]"
        >
          Book Your Trip Today
          <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
