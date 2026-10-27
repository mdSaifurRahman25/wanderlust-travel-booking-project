"use client";

import { useState, type FormEvent } from "react";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const fieldClasses =
    "h-[26px] rounded-[4px] border-[#e5e7eb] bg-[#f9fafb] px-3 text-sm text-[#111827] shadow-none placeholder:text-[#9ca3af] focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20";

const labelClasses =
    "mb-1 text-xs font-semibold leading-none text-[#111827]";

const categories = [
    "Beach",
    "Mountain",
    "City",
    "Adventure",
    "Cultural",
    "Wildlife",
];

const currentYear = new Date().getFullYear();
const startMonth = new Date(currentYear, 0, 1);
const endMonth = new Date(currentYear + 5, 11, 31);

export default function AddDestinationPage() {
    const [departureDate, setDepartureDate] = useState<Date | undefined>();
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [requestError, setRequestError] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setRequestError(null);
        const form = Object.fromEntries(new FormData(event.currentTarget).entries());

        try {
            const response = await fetch("http://localhost:8000/add-destination", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data: unknown = await response.json();
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            console.log(data, "from add-destination page");
        } catch (error) {
            setRequestError(
                error instanceof Error
                    ? error.message
                    : "Unable to submit the travel package."
            );
        }
    }

    return (
        <main className="flex-1 bg-[#f9fafb]">
            <div className="mx-auto w-full max-w-[1280px] px-4 pt-5 pb-12 sm:px-6 lg:px-10">
                <h1 className="font-display text-[28px] font-normal leading-none tracking-[-0.02em] text-[#0c0b0b]">
                    Add New Travel Package
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="mx-auto mt-12 w-full max-w-[448px] rounded-lg border border-[#e5e7eb] bg-white p-5 shadow-sm"
                >
                    <div className="space-y-3">
                        <div>
                            <Label htmlFor="destination-name" className={labelClasses}>
                                Destination Name
                            </Label>
                            <Input
                                id="destination-name"
                                name="destinationName"
                                defaultValue="Bali Paradise"
                                className={fieldClasses}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="country" className={labelClasses}>
                                    Country
                                </Label>
                                <Input
                                    id="country"
                                    name="country"
                                    defaultValue="Indonesia"
                                    className={fieldClasses}
                                />
                            </div>

                            <div>
                                <Label htmlFor="category" className={labelClasses}>
                                    Category
                                </Label>
                                <NativeSelect
                                    id="category"
                                    name="category"
                                    defaultValue="Beach"
                                    className="w-full [&_select]:h-[26px] [&_select]:rounded-[4px] [&_select]:border-[#e5e7eb] [&_select]:bg-[#f9fafb] [&_select]:px-3 [&_select]:text-sm [&_select]:text-[#111827] [&_select]:focus-visible:border-brand [&_select]:focus-visible:ring-2 [&_select]:focus-visible:ring-brand/20 [&_svg]:text-[#9ca3af]"
                                >
                                    {categories.map((category) => (
                                        <NativeSelectOption key={category} value={category}>
                                            {category}
                                        </NativeSelectOption>
                                    ))}
                                </NativeSelect>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="price" className={labelClasses}>
                                    Price (USD)
                                </Label>
                                <Input
                                    id="price"
                                    name="price"
                                    inputMode="decimal"
                                    placeholder="e.g., 1299"
                                    className={fieldClasses}
                                />
                            </div>

                            <div>
                                <Label htmlFor="duration" className={labelClasses}>
                                    Duration
                                </Label>
                                <Input
                                    id="duration"
                                    name="duration"
                                    placeholder="e.g., 7 Days/6 Nights"
                                    className={fieldClasses}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="departure-date" className={labelClasses}>
                                Departure Date
                            </Label>
                            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                <PopoverTrigger
                                    render={
                                        <button
                                            type="button"
                                            id="departure-date"
                                            className={cn(
                                                fieldClasses,
                                                "flex w-full cursor-pointer items-center justify-between gap-2 text-left outline-none",
                                                !departureDate && "text-[#9ca3af]"
                                            )}
                                        >
                                            <span className="min-w-0 flex-1 truncate">
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
                                        startMonth={startMonth}
                                        endMonth={endMonth}
                                        formatters={{
                                            formatMonthDropdown: (date) => format(date, "LLLL"),
                                        }}
                                        onSelect={(date) => {
                                            if (date) {
                                                setDepartureDate(date);
                                                setCalendarOpen(false);
                                            }
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
                            <Label htmlFor="image-url" className={labelClasses}>
                                Image URL
                            </Label>
                            <Input
                                id="image-url"
                                name="imageUrl"
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                className={fieldClasses}
                            />
                        </div>

                        <div>
                            <Label htmlFor="description" className={labelClasses}>
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                rows={4}
                                placeholder="Describe the travel experience..."
                                className="h-24 min-h-24 resize-none rounded-[4px] border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm text-[#111827] field-sizing-fixed shadow-none placeholder:text-[#9ca3af] focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20"
                            />
                        </div>
                    </div>

                    {requestError && (
                        <p role="alert" className="mt-4 text-sm text-red-600">
                            Could not add the travel package: {requestError}
                        </p>
                    )}

                    <div className="mt-6 flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-[34px] rounded-[4px] border-[#fca5a5] bg-white px-4 text-sm font-medium text-[#ef4444] shadow-none hover:bg-[#fef2f2] hover:text-[#dc2626] focus-visible:border-[#ef4444] focus-visible:ring-[#fecaca]"
                        >
                            <Trash2 className="size-4" aria-hidden="true" />
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="h-[34px] rounded-[4px] bg-brand px-4 text-sm font-medium text-white shadow-none hover:bg-brand-strong focus-visible:border-brand focus-visible:ring-brand/20"
                        >
                            <Plus className="size-4" aria-hidden="true" />
                            Add Travel Package
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
