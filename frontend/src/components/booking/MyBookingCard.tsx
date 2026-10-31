"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CalendarDays, CircleCheck, Eye, MapPin, Trash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { Booking } from "@/types";

const fallbackImage = "/images/destinations/image1.png";

type BookingStatus = "Confirmed" | "Pending";

const statusStyles: Record<BookingStatus, string> = {
    Confirmed: "bg-green-50 text-green-600",
    Pending: "bg-amber-50 text-amber-600",
};

// Bookings have no status field yet; a booking stored in the DB is confirmed.
const status: BookingStatus = "Confirmed";

function formatDepartureDate(value: string) {
    const [year, month, day] = value.split("-").map(Number);

    if (!year || !month || !day) {
        return value;
    }

    const date = new Date(year, month - 1, day);

    return Number.isNaN(date.getTime())
        ? value
        : date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
}

type MyBookingCardProps = {
    booking: Booking;
};

const MyBookingCard = ({ booking }: MyBookingCardProps) => {
    console.log('from My Booking Card', booking);
    
    const router = useRouter();
    const [isCancelling, setIsCancelling] = useState(false);

    const bookingId = booking._id;
    const name = booking.destinationName || "Untitled destination";
    const price =
        typeof booking.price === "number"
            ? booking.price
            : Number.parseFloat(booking.price ?? "");
    const formattedPrice = Number.isFinite(price)
        ? `$${price.toLocaleString()}`
        : "Contact us";

    const viewHref = booking.destinationId
        ? `/destinations/${encodeURIComponent(booking.destinationId)}`
        : null;

    const handleCancel = async () => {
        if (!bookingId || isCancelling) {
            return;
        }

        setIsCancelling(true);

        try {
            const response = await fetch(
                `http://localhost:8000/my-bookings/${encodeURIComponent(bookingId)}`,
                { method: "DELETE" },
            );

            if (!response.ok) {
                const body = (await response.json().catch(() => null)) as {
                    message?: string;
                } | null;

                throw new Error(
                    body?.message ?? `Request failed with status ${response.status}`,
                );
            }

            toast.success("Your booking has been cancelled.");
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Unable to cancel the booking.",
            );
        } finally {
            setIsCancelling(false);
        }
    };

    return (
        <div className="">
            <article className="flex flex-col overflow-hidden rounded-lg border border-[#eeeeee] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.12)] sm:flex-row">
                <div className="relative aspect-[16/10] w-full shrink-0 bg-[#e8f2f5] sm:aspect-auto sm:w-[300px] lg:w-[340px]">
                    <Image
                        src={booking.imageUrl || fallbackImage}
                        alt={name}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, 340px"
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-1 flex-col p-5">
                    <span
                        className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${statusStyles[status]}`}
                    >
                        <CircleCheck className="size-3" aria-hidden="true" />
                        {status}
                    </span>

                    <h2 className="mt-2 text-2xl font-semibold text-[#141414]">{name}</h2>

                    <div className="mt-2 space-y-1.5 text-[13px] text-[#666]">
                        <p className="flex items-center gap-1.5">
                            <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
                            <span>
                                Departure: {formatDepartureDate(booking.departureDate)}
                            </span>
                        </p>
                        <p className="flex items-center gap-1.5">
                            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                            <span className="truncate" title={bookingId}>
                                Booking ID: {bookingId ?? "Not available"}
                            </span>
                        </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 sm:mt-auto">
                        <p className="text-2xl font-semibold text-brand">
                            {formattedPrice}
                        </p>

                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                size="lg"
                                onClick={handleCancel}
                                disabled={!bookingId || isCancelling}
                                className="border-red-200 bg-white text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                            >
                                <Trash />
                                {isCancelling ? "Cancelling..." : "Cancel"}
                            </Button>

                            {viewHref ? (
                                <Button
                                    render={<Link href={viewHref} />}
                                    size="lg"
                                    className="bg-brand text-white hover:bg-brand-strong"
                                >
                                    <Eye />
                                    View
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    size="lg"
                                    disabled
                                    className="bg-brand text-white"
                                >
                                    <Eye />
                                    View
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default MyBookingCard;
