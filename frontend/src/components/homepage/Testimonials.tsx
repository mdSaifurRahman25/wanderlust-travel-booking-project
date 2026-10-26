"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali trip was absolutely magical! Every detail was perfectly planned. The resorts were luxurious and the cultural experiences were unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      "Swiss Alps adventure exceeded all expectations. The mountain views were breathtaking and our guide was incredibly knowledgeable. Highly recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
];

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="size-6 shrink-0"
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917Z"
      />
      <path
        fill="#FF3D00"
        d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917Z"
      />
    </svg>
  );
}

function CarouselControls() {
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarousel();

  return (
    <div className="flex shrink-0 items-center gap-4 self-end sm:self-auto">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Previous testimonial"
        className="size-12 rounded-full border-[#b6b6b6] bg-transparent text-[#b6b6b6] hover:border-brand hover:bg-transparent hover:text-brand disabled:opacity-100 sm:size-[60px]"
      >
        <ArrowLeft className="size-5 sm:size-6" aria-hidden="true" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Next testimonial"
        className="size-12 rounded-full border-[#b6b6b6] bg-transparent text-[#b6b6b6] hover:border-brand hover:bg-transparent hover:text-brand disabled:opacity-100 sm:size-[60px]"
      >
        <ArrowRight className="size-5 sm:size-6" aria-hidden="true" />
      </Button>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-20 lg:py-[120px]"
    >
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mx-auto w-full max-w-[1280px]"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id="testimonials-heading"
              className="font-display text-[clamp(2.25rem,4.17vw,3.75rem)] font-medium leading-none tracking-[-0.03em] text-[#0c0b0b]"
            >
              What Travelers Say
            </h2>
            <p className="mt-2 text-base leading-[1.6667] tracking-[-0.03em] text-[#6c696d] sm:text-lg">
              Real experiences from our happy travelers
            </p>
          </div>

          <CarouselControls />
        </div>

        <CarouselContent className="-ml-6 mt-10">
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.name}
              className="basis-full pl-6 wide:basis-1/2"
            >
              <article className="mx-auto flex h-full max-w-[628px] flex-col gap-6 bg-white p-6 shadow-[inset_0_0_0_1px_#eeeeee] sm:flex-row sm:items-center sm:gap-8 wide:mx-0 wide:min-h-[312px] wide:gap-12">
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 self-stretch">
                  <div>
                    <div className="flex items-center gap-3">
                      <GoogleIcon />
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold tracking-[-0.004em] text-[#121212]">
                          4.9/5
                        </span>
                        <div
                          className="flex items-center gap-0.5"
                          role="img"
                          aria-label="Rated 4.9 out of 5"
                        >
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              aria-hidden="true"
                              className="size-4 fill-[#b17d69] text-[#b17d69]"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <blockquote className="mt-2 font-display text-xl font-medium leading-none tracking-[-0.01em] text-[#0c0b0b] sm:text-2xl">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div>
                    <p className="font-display text-lg leading-none tracking-[-0.005em] text-brand sm:text-xl">
                      — {testimonial.name}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-sm leading-[1.142857] text-[#6c696d]">
                      <MapPin
                        className="size-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                <Image
                  src={testimonial.image}
                  alt={`Portrait of ${testimonial.name}`}
                  width={218}
                  height={264}
                  className="h-[220px] w-full shrink-0 object-cover object-top sm:h-[264px] sm:w-[218px] sm:object-center"
                />
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
