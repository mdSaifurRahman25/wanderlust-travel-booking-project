

import DestinationBrowser from "@/components/destinations/DestinationBrowser";
import type { DestinationApiResponse } from "@/types";

export default async function AllDestinationPage() {
  const response = await fetch("http://localhost:8000/destinations", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load destinations (${response.status}).`);
  }

  const destinations: DestinationApiResponse = await response.json();
  return (
    <main className="flex-1 bg-white">
      <section className="mx-auto w-full max-w-[1280px] px-4 pb-14 pt-5 sm:px-6 lg:px-10 lg:pt-7">
        <h1 className="text-[28px] font-normal leading-tight tracking-[-0.045em] text-[#111] sm:text-[32px]">
          Explore All Destinations
        </h1>
        <p className="mt-1 text-xs text-[#737373]">
          Find your perfect travel experience from our curated collection
        </p>

        <DestinationBrowser destinations={destinations} />
      </section>
    </main>
  );
}