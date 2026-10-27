"use client";

import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import { useMemo, useState } from "react";

import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import type {
  Destination,
  DestinationPriceRange,
  DestinationSortBy,
} from "@/types";

const fallbackImages = [
  "/images/destinations/image6.png",
  "/images/destinations/image5.png",
  "/images/destinations/image4.png",
  "/images/destinations/image3.png",
  "/images/destinations/image2.png",
  "/images/destinations/image1.png",
];

const selectClasses =
  "h-8 w-full rounded-none border-[#d6d6d6] bg-white px-3 text-[11px] font-normal text-[#555] [&_select]:h-[30px] [&_select]:rounded-none [&_select]:border-0 [&_select]:bg-transparent [&_select]:px-3 [&_select]:text-[11px] [&_select]:font-normal [&_select]:tracking-wide [&_svg]:right-3 [&_svg]:size-3 [&_svg]:text-[#aaa]";

function getPrice(destination: Destination) {
  const price =
    typeof destination.price === "number"
      ? destination.price
      : Number.parseFloat(destination.price ?? "");

  return Number.isFinite(price) ? price : null;
}

function matchesPriceRange(
  price: number | null,
  range: DestinationPriceRange
) {
  if (range === "all") return true;
  if (price === null) return false;
  if (range === "under-1000") return price < 1000;
  if (range === "1000-2500") return price >= 1000 && price <= 2500;
  if (range === "2500-5000") return price > 2500 && price <= 5000;
  return price > 5000;
}

function getName(destination: Destination) {
  return destination.destinationName || destination.name || "Untitled destination";
}

function formatPrice(price: number | null) {
  return price === null ? "Contact for price" : `$${price.toLocaleString()}`;
}

export default function DestinationBrowser({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<DestinationPriceRange>("all");
  const [sortBy, setSortBy] = useState<DestinationSortBy>("recommended");

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          destinations
            .map((destination) => destination.category)
            .filter((value): value is string => Boolean(value))
        )
      ).sort((a, b) => a.localeCompare(b)),
    [destinations]
  );

  const visibleDestinations = useMemo(() => {
    const filtered = destinations
      .map((destination, index) => ({
        destination,
        fallbackImage: fallbackImages[index % fallbackImages.length],
      }))
      .filter(({ destination }) => {
        const categoryMatches =
          category === "all" || destination.category === category;
        return (
          categoryMatches &&
          matchesPriceRange(getPrice(destination), priceRange)
        );
      });

    if (sortBy === "price-low-to-high") {
      filtered.sort(
        (a, b) =>
          (getPrice(a.destination) ?? Number.POSITIVE_INFINITY) -
          (getPrice(b.destination) ?? Number.POSITIVE_INFINITY)
      );
    } else if (sortBy === "price-high-to-low") {
      filtered.sort(
        (a, b) =>
          (getPrice(b.destination) ?? Number.NEGATIVE_INFINITY) -
          (getPrice(a.destination) ?? Number.NEGATIVE_INFINITY)
      );
    } else if (sortBy === "name-a-to-z") {
      filtered.sort((a, b) =>
        getName(a.destination).localeCompare(getName(b.destination))
      );
    } else if (sortBy === "rating-high-to-low") {
      filtered.sort(
        (a, b) =>
          (b.destination.rating ?? 4.5) - (a.destination.rating ?? 4.5)
      );
    }

    return filtered;
  }, [category, destinations, priceRange, sortBy]);

  return (
    <>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3">
        <label className="sr-only" htmlFor="destination-category">
          Filter by category
        </label>
        <NativeSelect
          id="destination-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className={selectClasses}
        >
          <NativeSelectOption value="all">CATEGORY</NativeSelectOption>
          {categories.map((value) => (
            <NativeSelectOption key={value} value={value}>
              {value.toUpperCase()}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <label className="sr-only" htmlFor="destination-price-range">
          Filter by price range
        </label>
        <NativeSelect
          id="destination-price-range"
          value={priceRange}
          onChange={(event) =>
            setPriceRange(event.target.value as DestinationPriceRange)
          }
          className={`${selectClasses} sm:border-l-0`}
        >
          <NativeSelectOption value="all">PRICE RANGE</NativeSelectOption>
          <NativeSelectOption value="under-1000">Under $1,000</NativeSelectOption>
          <NativeSelectOption value="1000-2500">$1,000 - $2,500</NativeSelectOption>
          <NativeSelectOption value="2500-5000">$2,501 - $5,000</NativeSelectOption>
          <NativeSelectOption value="over-5000">Over $5,000</NativeSelectOption>
        </NativeSelect>

        <label className="sr-only" htmlFor="destination-sort">
          Sort destinations
        </label>
        <NativeSelect
          id="destination-sort"
          value={sortBy}
          onChange={(event) =>
            setSortBy(event.target.value as DestinationSortBy)
          }
          className={`${selectClasses} sm:border-l-0`}
        >
          <NativeSelectOption value="recommended">SORT BY</NativeSelectOption>
          <NativeSelectOption value="price-low-to-high">
            Price: low to high
          </NativeSelectOption>
          <NativeSelectOption value="price-high-to-low">
            Price: high to low
          </NativeSelectOption>
          <NativeSelectOption value="name-a-to-z">Name: A to Z</NativeSelectOption>
          <NativeSelectOption value="rating-high-to-low">
            Highest rated
          </NativeSelectOption>
        </NativeSelect>
      </div>

      <p className="mt-3 text-xs text-[#737373]" aria-live="polite">
        Showing {visibleDestinations.length}{" "}
        {visibleDestinations.length === 1 ? "destination" : "destinations"}
      </p>

      {visibleDestinations.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
          {visibleDestinations.map(({ destination, fallbackImage }, index) => {
            const name = getName(destination);
            const price = getPrice(destination);

            return (
              <article
                key={
                  destination._id ??
                  destination.id ??
                  `${name}-${destination.country ?? "destination"}-${index}`
                }
                className="min-w-0"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[#e8f2f5]">
                  <Image
                    src={destination.imageUrl || fallbackImage}
                    alt={name}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                  <div className="absolute right-2 top-2 flex items-center gap-1 bg-white/90 px-2 py-1 text-[10px] font-medium text-[#111]">
                    {destination.rating?.toFixed(1) ?? "4.5"}
                    <Star className="size-3 fill-current" aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-1 text-[10px] text-[#666]">
                  <MapPin className="size-3" aria-hidden="true" />
                  <span>{destination.country || "Location not set"}</span>
                </div>

                <div className="mt-1 flex items-baseline justify-between gap-2">
                  <h2 className="truncate text-sm font-medium text-[#141414]">
                    {name}
                  </h2>
                  <p className="shrink-0 text-sm font-medium text-[#111]">
                    {formatPrice(price)}
                    {price !== null && (
                      <span className="text-[10px] font-normal text-[#666]">
                        /Person
                      </span>
                    )}
                  </p>
                </div>

                <p className="mt-1 flex items-center gap-1 text-[10px] text-[#555]">
                  <CalendarDays className="size-3" aria-hidden="true" />
                  <span>
                    {destination.duration ||
                      destination.departureDate ||
                      "Flexible dates"}
                  </span>
                </p>

                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium uppercase text-brand underline underline-offset-2">
                  Book now
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </span>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 border border-dashed border-[#d6d6d6] px-4 py-10 text-center text-sm text-[#737373]">
          No destinations match these filters.
        </div>
      )}
    </>
  );
}
