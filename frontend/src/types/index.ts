export type DestinationCategory =
  | "Beach"
  | "Mountain"
  | "City"
  | "Adventure"
  | "Cultural"
  | "Wildlife";

export type Destination = {
  _id?: string;
  id?: string;
  destinationName?: string;
  name?: string;
  country?: string;
  category?: DestinationCategory | string;
  price?: number | string;
  duration?: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  highlights?: string[];
};

export type DestinationApiResponse = Destination[];

export type DestinationDetailApiResponse = {
  result: Destination | null;
};

export type Booking = {
  _id?: string;
  destinationId: string;
  destinationName: string;
  country?: string;
  price?: number | null;
  duration?: string;
  imageUrl?: string;
  departureDate: string;
  username: string;
  email: string;
  image?: string;
  createdAt?: string;
};

export type BookingApiResponse = {
  result: Booking;
};

export type DestinationPriceRange =
  | "all"
  | "under-1000"
  | "1000-2500"
  | "2500-5000"
  | "over-5000";

export type DestinationSortBy =
  | "recommended"
  | "price-low-to-high"
  | "price-high-to-low"
  | "name-a-to-z"
  | "rating-high-to-low";

export type DestinationFilters = {
  category: string;
  priceRange: DestinationPriceRange;
  sortBy: DestinationSortBy;
};
