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
};

export type DestinationApiResponse = Destination[];

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
