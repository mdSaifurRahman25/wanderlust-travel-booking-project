"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CalendarIcon, Check, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Destination } from "@/types";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Wildlife",
];

const fieldClasses =
  "h-[34px] rounded-[4px] border-[#e5e7eb] bg-[#f9fafb] px-3 text-sm text-[#111827] shadow-none placeholder:text-[#9ca3af] focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20";

const labelClasses = "mb-1 text-xs font-semibold leading-none text-[#111827]";

function parseDepartureDate(value: string | undefined) {
  if (!value) return undefined;

  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default function EditDestinationDialog({
  destination,
}: {
  destination: Destination;
}) {
  const router = useRouter();
  const destinationId = destination._id ?? destination.id;
  const [open, setOpen] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | undefined>(() =>
    parseDepartureDate(destination.departureDate)
  );
  const [calendarOpen, setCalendarOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestError(null);

    if (!destinationId) {
      setRequestError("This destination has no ID and cannot be updated.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const priceValue = String(formData.get("price") ?? "").trim();
    const form = {
      destinationName: String(formData.get("destinationName") ?? "").trim(),
      country: String(formData.get("country") ?? "").trim(),
      category: String(formData.get("category") ?? ""),
      price: priceValue === "" ? "" : Number(priceValue),
      duration: String(formData.get("duration") ?? "").trim(),
      departureDate: String(formData.get("departureDate") ?? ""),
      imageUrl: String(formData.get("imageUrl") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
    };

    try {
      const response = await fetch(
        `http://localhost:8000/destinations/${encodeURIComponent(destinationId)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data: unknown = await response.json();
      if (!response.ok) {
        const message =
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof data.message === "string"
            ? data.message
            : `Request failed with status ${response.status}`;
        throw new Error(message);
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      setRequestError(
        error instanceof Error ? error.message : "Unable to update destination."
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="inline-flex h-8 items-center gap-2 rounded-none border-[#d6d6d6] px-3 text-xs text-[#333]"
          >
            <Pencil className="size-3.5" aria-hidden="true" />
            Edit
          </Button>
        }
      />
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-destination-name" className={labelClasses}>
              Destination Name
            </Label>
            <Input
              id="edit-destination-name"
              name="destinationName"
              defaultValue={destination.destinationName ?? destination.name ?? ""}
              className={fieldClasses}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="edit-country" className={labelClasses}>
                Country
              </Label>
              <Input
                id="edit-country"
                name="country"
                defaultValue={destination.country ?? ""}
                className={fieldClasses}
                required
              />
            </div>

            <div>
              <Label htmlFor="edit-category" className={labelClasses}>
                Category
              </Label>
              <NativeSelect
                id="edit-category"
                name="category"
                defaultValue={destination.category ?? "Beach"}
                className="w-full [&_select]:h-[34px] [&_select]:rounded-[4px] [&_select]:border-[#e5e7eb] [&_select]:bg-[#f9fafb] [&_select]:px-3 [&_select]:text-sm [&_select]:text-[#111827] [&_select]:focus-visible:border-brand [&_select]:focus-visible:ring-2 [&_select]:focus-visible:ring-brand/20 [&_svg]:text-[#9ca3af]"
              >
                {categories.map((category) => (
                  <NativeSelectOption key={category} value={category}>
                    {category}
                  </NativeSelectOption>
                ))}
                {destination.category &&
                  !categories.includes(destination.category) && (
                    <NativeSelectOption value={destination.category}>
                      {destination.category}
                    </NativeSelectOption>
                  )}
              </NativeSelect>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="edit-price" className={labelClasses}>
                Price (USD)
              </Label>
              <Input
                id="edit-price"
                name="price"
                type="number"
                min="0"
                step="any"
                defaultValue={destination.price ?? ""}
                className={fieldClasses}
                required
              />
            </div>

            <div>
              <Label htmlFor="edit-duration" className={labelClasses}>
                Duration
              </Label>
              <Input
                id="edit-duration"
                name="duration"
                defaultValue={destination.duration ?? ""}
                placeholder="e.g., 7 Days/6 Nights"
                className={fieldClasses}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-departure-date" className={labelClasses}>
              Departure Date
            </Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    id="edit-departure-date"
                    className={cn(
                      fieldClasses,
                      "flex w-full cursor-pointer items-center justify-between gap-2 text-left outline-none",
                      !departureDate && "text-[#9ca3af]"
                    )}
                  >
                    <span>
                      {departureDate
                        ? format(departureDate, "MM/dd/yyyy")
                        : "mm/dd/yyyy"}
                    </span>
                    <CalendarIcon
                      className="size-4 shrink-0 text-[#9ca3af]"
                      aria-hidden="true"
                    />
                  </button>
                }
              />
              <PopoverContent
                align="start"
                sideOffset={6}
                aria-label="Select departure date"
                className="w-auto gap-0 p-0 [--primary:#15a1bf] [--primary-foreground:#ffffff]"
              >
                <Calendar
                  mode="single"
                  selected={departureDate}
                  defaultMonth={departureDate}
                  captionLayout="dropdown"
                  startMonth={new Date(currentYear, 0, 1)}
                  endMonth={new Date(currentYear + 5, 11, 31)}
                  onSelect={(date) => {
                    setDepartureDate(date);
                    setCalendarOpen(false);
                  }}
                />
                <div className="flex items-center justify-between border-t border-[#e5e7eb] px-3 py-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto px-0 text-sm font-medium text-brand hover:bg-transparent hover:text-brand-strong"
                    onClick={() => {
                      setDepartureDate(undefined);
                      setCalendarOpen(false);
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto px-0 text-sm font-medium text-brand hover:bg-transparent hover:text-brand-strong"
                    onClick={() => {
                      setDepartureDate(new Date());
                      setCalendarOpen(false);
                    }}
                  >
                    Today
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <input
              type="hidden"
              name="departureDate"
              value={departureDate ? format(departureDate, "yyyy-MM-dd") : ""}
              readOnly
            />
          </div>

          <div>
            <Label htmlFor="edit-image-url" className={labelClasses}>
              Image URL
            </Label>
            <Input
              id="edit-image-url"
              name="imageUrl"
              type="url"
              defaultValue={destination.imageUrl ?? ""}
              placeholder="https://example.com/image.jpg"
              className={fieldClasses}
            />
          </div>

          <div>
            <Label htmlFor="edit-description" className={labelClasses}>
              Description
            </Label>
            <Textarea
              id="edit-description"
              name="description"
              rows={4}
              defaultValue={destination.description ?? ""}
              placeholder="Describe the travel experience..."
              className="min-h-24 resize-y rounded-[4px] border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm text-[#111827] shadow-none placeholder:text-[#9ca3af] focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20"
            />
          </div>

          {requestError && (
            <p role="alert" className="text-sm text-red-600">
              Could not update destination: {requestError}
            </p>
          )}

          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button type="submit" disabled={!destinationId}>
              <Check className="size-4" aria-hidden="true" />
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
