export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  popularityScore: number;
  bestTimeToVisit: string;
  averageTemp: string;
  attractions: string[];
}

export interface Package {
  id: string;
  title: string;
  destination: string;
  destinationId: string;
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  type: 'adventure' | 'luxury' | 'budget' | 'family' | 'honeymoon' | 'cultural';
  includes: string[];
  highlights: string[];
  itinerary: ItineraryDay[];
  hotels: string[];
  activities: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  destinationId: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  roomTypes: string[];
  nearbyAttractions: string[];
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  wishlist: string[];
  bookings: Booking[];
}

export interface Booking {
  id: string;
  packageId: string;
  packageTitle: string;
  destination: string;
  travelers: number;
  totalPrice: number;
  bookingDate: string;
  travelDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface SearchFilters {
  destination?: string;
  priceRange?: [number, number];
  duration?: string;
  type?: string;
  rating?: number;
}
