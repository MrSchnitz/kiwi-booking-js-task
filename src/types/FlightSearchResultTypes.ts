export interface FlightSearchResult {
  id: string;
  flyFrom: string;
  flyTo: string;
  cityFrom: string;
  cityCodeFrom: string;
  cityTo: string;
  cityCodeTo: string;
  countryFrom: Country;
  countryTo: Country;
  dTime: number;
  dTimeUTC: number;
  aTime: number;
  aTimeUTC: number;
  nightsInDest: number;
  quality: number;
  distance: number;
  duration: Duration;
  fly_duration: string;
  return_duration: string;
  price: number;
  conversion: Conversion;
  bags_price: BagsPrice;
  baglimit: Baglimit;
  availability: Availability;
  airlines: string[];
  route: Route[];
  booking_token: string;
  deep_link: string;
  tracking_pixel: string;
  facilitated_booking_available: boolean;
  pnr_count: number;
  has_airport_change: boolean;
  technical_stops: number;
  throw_away_ticketing: boolean;
  hidden_city_ticketing: boolean;
  virtual_interlining: boolean;
  mapIdfrom: string;
  mapIdto: string;
  hashtags: string[];
}

export interface Availability {
  seats: number;
}

export interface Baglimit {
  hold_dimensions_sum: number;
  hold_height: number;
  hold_length: number;
  hold_weight: number;
  hold_width: number;
  personal_item_height: number;
  personal_item_length: number;
  personal_item_weight: number;
  personal_item_width: number;
}

export interface BagsPrice {
  "1": number;
  "2": number;
  personal_item: number;
}

export interface Conversion {
  EUR: number;
}

export interface Country {
  code: string;
  name: string;
}

export interface Duration {
  departure: number;
  return: number;
  total: number;
}

export interface Route {
  id: string;
  combination_id: string;
  flyFrom: string;
  flyTo: string;
  cityFrom: string;
  cityCodeFrom: string;
  cityTo: string;
  cityCodeTo: string;
  dTime: number;
  dTimeUTC: number;
  aTime: number;
  aTimeUTC: number;
  airline: string;
  flight_no: number;
  operating_carrier: string;
  operating_flight_no: string;
  fare_basis: string;
  fare_category: string;
  fare_classes: string;
  fare_family: string;
  return: number;
  latFrom: number;
  lngFrom: number;
  latTo: number;
  lngTo: number;
  mapIdfrom: string;
  mapIdto: string;
  bags_recheck_required: boolean;
  vi_connection: boolean;
  guarantee: boolean;
  equipment: null;
  vehicle_type: string;
  following_airport_change?: boolean;
  original_return: number;
}
