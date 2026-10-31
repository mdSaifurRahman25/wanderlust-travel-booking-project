"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import type { Booking, Destination } from "@/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type BookingCardProps = {
  destination: Destination;
};

const BookingCard = ({ destination }: BookingCardProps) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const price =
    typeof destination.price === "number"
      ? destination.price
      : Number.parseFloat(destination.price ?? "");
  const formattedPrice = Number.isFinite(price)
    ? `$${price.toLocaleString()}`
    : "Contact us";

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to book this destination.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const departureDate = String(formData.get("departureDate") ?? "").trim();

    if (!departureDate) {
      toast.error("Please choose a departure date.");
      return;
    }

    const payload: Omit<Booking, "_id" | "createdAt"> = {
      destinationId: destination._id ?? destination.id ?? null,
      destinationName: destination.destinationName ?? destination.name ?? "",
      country: destination.country ?? "",
      price: Number.isFinite(price) ? price : null,
      duration: destination.duration ?? "",
      imageUrl: destination.imageUrl ?? "",
      departureDate,
      username: user.name,
      email: user.email,
      image: user.image ?? "",
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      toast.success("Booking confirmed!");
      form.reset();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to complete the booking."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="h-fit border border-[#eeeeee] bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.12)] md:mt-0">
      <p className="text-[10px] text-[#777]">Starting from</p>
      <p className="text-[22px] font-semibold leading-tight text-brand">
        {formattedPrice}
      </p>
      {Number.isFinite(price) && (
        <p className="text-[10px] text-[#777]">per person</p>
      )}

      <form onSubmit={handleBooking}>
        <Input
          type="date"
          name="departureDate"
          aria-label="Departure date"
          defaultValue={destination.departureDate}
          required
          className="mt-4"
        />

        <Button
          type="submit"
          disabled={isPending || !user || isSubmitting}
          title={
            isSubmitting
              ? "Completing your booking..."
              : isPending
                ? "Loading your account..."
                : user
                  ? undefined
                  : "Sign in to book this destination."
          }
          className="mt-4 w-full bg-brand"
        >
          {isSubmitting ? "Booking..." : "Book Now"}
          <ArrowRight />
        </Button>
      </form>

      <ul className="mt-3 space-y-1.5">
        {[
          "Destination details at a glance",
          "Departure information when available",
          "Price shown per person",
        ].map((benefit) => (
          <li
            key={benefit}
            className="flex items-start gap-1.5 text-[9px] leading-4 text-[#666]"
          >
            <Check
              className="mt-0.5 size-3 shrink-0 text-[#16a34a]"
              aria-hidden="true"
            />
            {benefit}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BookingCard;
