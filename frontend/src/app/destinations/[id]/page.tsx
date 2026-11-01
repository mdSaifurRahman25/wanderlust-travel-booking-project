import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    Check,
    MapPin,
    Star,
} from "lucide-react";

import type { DestinationDetailApiResponse } from "@/types";
import EditDestinationDialog from "@/components/destinations/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/destinations/DeleteDestinationDialog";
import BookingCard from "@/components/booking/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type DestinationDetailsPageProps = {
    params: Promise<{ id: string }>;
};

export default async function DestinationDetailsPage({
    params,
}: DestinationDetailsPageProps) {
    const { id } = await params;

    const jwtToken = await auth.api.getToken({
        headers: await headers(),
    });

    const response = await fetch(
        `http://localhost:8000/destinations/${encodeURIComponent(id)}`,
        {
            cache: "no-store",
            headers: jwtToken?.token
                ? { authorization: `Bearer ${jwtToken.token}` }
                : undefined,
        }
    );

    if (response.status === 404) {
        return (
            <main className="flex-1 px-4 py-12 text-center">
                <h1 className="text-2xl font-medium">Destination not found</h1>
                <Link href="/destinations" className="mt-4 inline-block text-brand underline">
                    Back to destinations
                </Link>
            </main>
        );
    }

    if (!response.ok) {
        throw new Error(`Failed to load destination (${response.status}).`);
    }

    const data: DestinationDetailApiResponse = await response.json();
    const destination = data.result;

    if (!destination) {
        return (
            <main className="flex-1 px-4 py-12 text-center">
                <h1 className="text-2xl font-medium">Destination not found</h1>
                <Link href="/destinations" className="mt-4 inline-block text-brand underline">
                    Back to destinations
                </Link>
            </main>
        );
    }

    const name =
        destination.destinationName || destination.name || "Travel destination";
   
  
    const highlights = destination.highlights?.length
        ? destination.highlights
        : [
            destination.duration && `Travel duration: ${destination.duration}`,
            destination.category && `${destination.category} experience`,
            destination.departureDate &&
            `Available departure: ${destination.departureDate}`,
        ].filter((highlight): highlight is string => Boolean(highlight));

    return (
        <main className="flex-1 bg-white">
            <article className="mx-auto w-full max-w-[1440px] px-4 pb-12 pt-3 sm:px-6 lg:px-5">
                <div className="flex min-h-8 items-center justify-between gap-3">
                    <Link
                        href="/destinations"
                        className="inline-flex items-center gap-2 text-xs text-[#666] transition-colors hover:text-brand"
                    >
                        <ArrowLeft className="size-3.5" aria-hidden="true" />
                        Back to Destinations
                    </Link>
                    <div className="flex items-center gap-2">
                        <EditDestinationDialog destination={destination} />
                        <DeleteDestinationDialog id={id} />
                    </div>
                </div>

                <div className="relative mt-3 aspect-[4/3] overflow-hidden bg-[#e8f2f5] md:aspect-[2.55/1]">
                    <Image
                        src={destination.imageUrl || "/images/destinations/image6.png"}
                        alt={name}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 96vw"
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="mt-6 grid gap-8 border-t border-[#eeeeee] pt-6 md:grid-cols-[minmax(0,1fr)_225px] lg:gap-12">
                    <div className="min-w-0">
                        <p className="flex items-center gap-1.5 text-xs text-[#666]">
                            <MapPin className="size-3.5" aria-hidden="true" />
                            {destination.country || "Destination"}
                        </p>

                        <h1 className="mt-2 font-display text-3xl font-normal leading-tight tracking-[-0.04em] text-[#111] sm:text-[38px]">
                            {name}
                        </h1>

                        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#555]">
                            {destination.rating !== undefined ? (
                                <span className="inline-flex items-center gap-1 font-medium text-[#222]">
                                    <Star
                                        className="size-3.5 fill-[#16a34a] text-[#16a34a]"
                                        aria-hidden="true"
                                    />
                                    {destination.rating.toFixed(1)}
                                </span>
                            ) : (
                                <span className="text-[#777]">Not rated yet</span>
                            )}
                            {destination.reviewCount !== undefined && (
                                <span className="text-[#777]">
                                    ({destination.reviewCount} reviews)
                                </span>
                            )}
                            {destination.duration && (
                                <span className="inline-flex items-center gap-1.5 text-[#222]">
                                    <CalendarDays className="size-3.5" aria-hidden="true" />
                                    {destination.duration}
                                </span>
                            )}
                        </div>

                        <section className="mt-6">
                            <h2 className="text-lg font-medium tracking-tight text-[#171717]">
                                Overview
                            </h2>
                            <p className="mt-2 whitespace-pre-line text-xs leading-[1.65] text-[#737373]">
                                {destination.description ||
                                    "Details for this destination have not been added yet."}
                            </p>
                        </section>

                        {highlights.length > 0 && (
                            <section className="mt-5">
                                <h2 className="text-lg font-medium tracking-tight text-[#171717]">
                                    Highlights
                                </h2>
                                <p className="mt-2 text-xs leading-[1.65] text-[#737373]">
                                    Key details for this travel package.
                                </p>
                                <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                                    {highlights.map((highlight) => (
                                        <li
                                            key={highlight}
                                            className="flex items-start gap-2 text-[11px] leading-5 text-[#666]"
                                        >
                                            <Check
                                                className="mt-0.5 size-3.5 shrink-0 text-[#16a34a]"
                                                aria-hidden="true"
                                            />
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>

                    {/* Booking Card */}
                    <BookingCard destination={destination} /> 

                </div>
            </article>
        </main>
    );
}