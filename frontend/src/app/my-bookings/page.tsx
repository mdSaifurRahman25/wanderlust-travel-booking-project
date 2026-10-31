import Link from "next/link";

import MyBookingCard from "@/components/booking/MyBookingCard";
import { auth } from "@/lib/auth";
import type { Booking } from "@/types";
import { headers } from "next/headers";

const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    let bookings: Booking[] = [];

    if (user?.email) {
        try {
            const res = await fetch(`http://localhost:8000/my-bookings/${encodeURIComponent(user.email)}`, { cache: "no-store" });
            const data = await res.json();
            bookings = Array.isArray(data) ? data : [];
        } catch (error) {
            console.error("Failed to load bookings:", error);
        }
    }

    return (
        <div className='container mx-auto'>
            <h1 className='text-6xl'>My Bookings</h1>
            <p>Manage and view your upcoming travel plans</p>

            <div className="my-10">
                {user ? (
                    bookings.length > 0 ? (
                        <div className="mt-6 space-y-5">
                            {bookings.map((booking) => (
                                <MyBookingCard
                                    key={booking._id ?? `${booking.destinationId}-${booking.departureDate}`}
                                    booking={booking}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-6 border border-dashed border-[#d6d6d6] px-4 py-10 text-center text-sm text-[#737373]">
                            You have no bookings yet.
                        </div>
                    )
                ) : (
                    <div className="mt-6 border border-dashed border-[#d6d6d6] px-4 py-10 text-center text-sm text-[#737373]">
                        Please{" "}
                        <Link
                            href="/login"
                            className="font-medium text-brand underline underline-offset-2"
                        >
                            sign in
                        </Link>{" "}
                        to view your bookings.
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyBookingsPage
