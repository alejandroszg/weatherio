// ==========================================
// Type Aliases
// ==========================================

/**
 * Wind direction compass abbreviation
 */
export type WindDirection = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

/**
 * Unit system for weather data
 */
export type UnitSystem = 'm' | 's' | 'f'; // metric | scientific | fahrenheit

/**
 * Query type for location lookup
 */
export type QueryType = 'City' | 'LatLon' | 'IP' | 'Zipcode';

// ==========================================
// Main Interfaces
// ==========================================

/**
 * WeatherStack API response structure for current weather data
 * @see https://weatherstack.com/documentation
 */
export interface WeatherResponse {
  request: Request;
  location: Location;
  current: Current;
}

export interface Current {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  wind_degree: number;
  wind_dir: WindDirection;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;

  /**
   * Astronomy data (sunrise, sunset, moon phase)
   * @premium Available only with paid plans
   */
  astro?: Astro;

  /**
   * Air quality measurements and indices
   * @premium Available only with paid plans
   */
  air_quality?: AirQuality;
}

/**
 * Air quality measurements and pollution indices
 * @premium Available only with paid plans
 */
export interface AirQuality {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  usEpaIndex: number;
  gbDefraIndex: number;
}

/**
 * Astronomical data for the location
 * @premium Available only with paid plans
 */
export interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
}

/**
 * Geographic location information
 */
export interface Location {
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  timezone_id: string;
  localtime: string;
  localtime_epoch: number;
  utc_offset: string;
}

/**
 * API request metadata
 */
export interface Request {
  type: QueryType;
  query: string;
  language: string;
  unit: UnitSystem;
}
