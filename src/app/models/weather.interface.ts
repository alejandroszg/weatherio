export interface Weather {
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
  astro: Astro;
  air_quality: AirQuality;
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
  is_day: string;
}

export interface AirQuality {
  co: string;
  no2: string;
  o3: string;
  so2: string;
  pm2_5: string;
  pm10: string;
  'us-epa-index': string;
  'gb-defra-index': string;
}

export interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
}

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

export interface Request {
  type: string;
  query: string;
  language: string;
  unit: string;
}

/**
 * Parámetros de consulta para la API de WeatherStack
 */
export interface WeatherQueryParams {
  /** API Key de WeatherStack */
  access_key: string;
  /** Ciudad o ubicación a consultar (nombre, coordenadas, código postal, etc.) */
  query: string;
  /** Sistema de unidades: 'm' (métrico), 'f' (fahrenheit), 's' (científico) */
  units?: 'm' | 'f' | 's';
}

/**
 * Estructura de error de la API de WeatherStack
 */
export interface WeatherApiError {
  /** Código de error de la API */
  code: number;
  /** Tipo de error */
  type: string;
  /** Mensaje descriptivo del error */
  info: string;
}
