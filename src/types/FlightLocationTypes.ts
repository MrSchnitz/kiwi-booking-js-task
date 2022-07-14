export interface FlightLocationsResponse {
  locations: FlightLocation[];
}

export interface FlightLocation {
  id: string;
  int_id: number;
  airport_int_id: number;
  active: boolean;
  code: string;
  icao: string;
  name: string;
  slug: string;
  slug_en: string;
  alternative_names: string[];
  rank: number;
  global_rank_dst: number;
  dst_popularity_score: number;
  timezone: string;
  city: City;
  location: LocationCoordinates;
  alternative_departure_points: AlternativeDeparturePoint[];
  tags: Tag[];
  providers: number[];
  special: any[];
  tourist_region: any[];
  car_rentals: any[];
  new_ground: boolean;
  routing_priority: number;
  type: string;
}

export interface AlternativeDeparturePoint {
  id: string;
  distance: number;
  duration: number;
}

export interface City {
  id: string;
  name: string;
  code: string;
  slug: string;
  region: Continent;
  autonomous_territory: null;
  country: Continent;
  continent: Continent;
  subdivision: Continent;
  nearby_country: null;
}

export interface Continent {
  id: string;
  name: string;
  slug: string;
  code?: string;
}

export interface LocationCoordinates {
  lat: number;
  lon: number;
}

export interface Tag {
  tag: string;
  month_to: number;
  month_from: number;
}
