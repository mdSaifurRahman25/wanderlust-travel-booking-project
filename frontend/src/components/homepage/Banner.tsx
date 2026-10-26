import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export default function Banner() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-64px)] flex-col overflow-hidden lg:min-h-[calc(100svh-88px)]">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_84%,#000_100%)]" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-10 pt-10 text-center sm:px-6 sm:pb-16 sm:pt-16 lg:px-8">
        <h1 className="max-w-[700px] font-display text-[clamp(2.5rem,7.22vw,6.5rem)] leading-none tracking-[-0.03em] text-white">
          <span className="block whitespace-nowrap">Discover Your</span>
          <span className="block whitespace-nowrap">Next Adventure</span>
        </h1>

        <p className="mt-3 max-w-[662px] text-base leading-[1.6] tracking-[-0.03em] text-[#edfcff] sm:text-xl">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:mt-10 sm:w-auto sm:flex-row">
          <Link
            href="/destinations"
            className="inline-flex h-12 w-full min-w-[207px] items-center justify-center gap-4 whitespace-nowrap bg-brand px-6 text-sm font-medium tracking-[0.005em] text-white uppercase transition-colors hover:bg-brand-strong sm:h-14 sm:gap-6 sm:text-base"
          >
            Explore Now
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex h-12 w-full min-w-[195px] items-center justify-center whitespace-nowrap bg-white/40 px-6 text-sm font-medium tracking-[0.005em] text-white uppercase transition-colors hover:bg-white/50 sm:h-14 sm:text-base"
          >
            View Destination
          </Link>
        </div>
      </div>

      <div className="relative z-10 w-full bg-black/20 lg:bg-transparent">
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_200px]">
          {searchFields.map((field) => (
            <button
              key={field.label}
              type="button"
              aria-label={`Select ${field.label}`}
              className="flex min-h-[68px] flex-col justify-center gap-2 bg-white/40 px-5 py-3 text-left transition-colors hover:bg-white/50 lg:min-h-[74px] lg:px-6 lg:py-4"
            >
              <span className="text-lg font-medium leading-none tracking-[-0.01em] text-white sm:text-xl">
                {field.label}
              </span>
              <span className="text-xs leading-none tracking-[-0.01em] text-white sm:text-sm">
                {field.value}
              </span>
            </button>
          ))}

          <button
            type="button"
            className="flex min-h-[60px] items-center justify-center bg-brand px-8 text-lg font-semibold text-white transition-colors hover:bg-brand-strong sm:col-span-2 sm:min-h-[74px] sm:text-xl lg:col-span-1 lg:w-[200px]"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
