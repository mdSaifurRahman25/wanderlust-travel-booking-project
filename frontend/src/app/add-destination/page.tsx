"use client";

import type { FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";

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

export default function AddDestinationPage() {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
                            <Input
                                id="departure-date"
                                name="departureDate"
                                placeholder="mm/dd/yyyy"
                                className={fieldClasses}
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
