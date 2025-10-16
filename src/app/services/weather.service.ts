import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  Weather,
  WeatherQueryParams,
  WeatherApiError
} from '../models/weather.interface';

/**
 * Servicio para consumir la API de WeatherStack
 *
 * Este servicio proporciona métodos para obtener información meteorológica
 * en tiempo real utilizando la API de WeatherStack. Implementa manejo robusto
 * de errores, reintentos automáticos y caché de respuestas.
 *
 * @example
 * ```typescript
 * constructor(private weatherService: WeatherService) {}
 *
 * ngOnInit() {
 *   this.weatherService.getCurrentWeather('London')
 *     .subscribe({
 *       next: (weather) => console.log(weather),
 *       error: (error) => console.error(error)
 *     });
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.weatherApiUrl;
  private readonly apiKey = environment.weatherApiKey;

  /**
   * Unidad de medida por defecto (métrico)
   * - 'm': Métrico (Celsius, km/h)
   * - 'f': Fahrenheit (Fahrenheit, mph)
   * - 's': Científico (Kelvin, m/s)
   */
  private readonly defaultUnits: 'm' | 'f' | 's' = 'm';

  /**
   * Obtiene el clima actual para una ciudad específica
   *
   * Este método consulta la API de WeatherStack para obtener información
   * meteorológica actualizada. Implementa:
   * - Reintento automático en caso de error de red (1 reintento)
   * - Caché de respuesta para múltiples suscriptores
   * - Transformación de datos a modelo tipado
   * - Manejo comprensivo de errores
   *
   * @param city - Nombre de la ciudad, código postal, coordenadas (lat,lon) o dirección IP
   * @param units - Sistema de unidades opcional ('m', 'f', 's'). Por defecto: 'm'
   * @returns Observable con los datos del clima
   *
   * @throws Error si la API key no está configurada
   * @throws Error si la respuesta de la API contiene un error
   * @throws Error si hay un problema de red o servidor
   *
   * @example
   * ```typescript
   * // Consulta en unidades métricas (por defecto)
   * this.weatherService.getCurrentWeather('Madrid').subscribe(weather => {
   *   console.log(`Temperatura: ${weather.current.temperature}°C`);
   * });
   *
   * // Consulta en Fahrenheit
   * this.weatherService.getCurrentWeather('New York', 'f').subscribe(weather => {
   *   console.log(`Temperatura: ${weather.current.temperature}°F`);
   * });
   *
   * // Manejo de errores
   * this.weatherService.getCurrentWeather('InvalidCity').subscribe({
   *   next: (weather) => this.displayWeather(weather),
   *   error: (error) => this.showErrorMessage(error)
   * });
   * ```
   */
  getCurrentWeather(city: string, units: 'm' | 'f' | 's' = this.defaultUnits): Observable<Weather> {
    // Validación de parámetros
    if (!city || city.trim().length === 0) {
      return throwError(() => new Error('El nombre de la ciudad es requerido'));
    }

    if (!this.apiKey) {
      return throwError(() => new Error('API Key no configurada. Verifica el archivo environment.ts'));
    }

    // Construcción de parámetros de consulta usando HttpParams
    const params = this.buildQueryParams({
      access_key: this.apiKey,
      query: city.trim(),
      units
    });

    // Realización de la petición HTTP
    return this.http.get<Weather | { error: WeatherApiError }>(this.apiUrl, { params })
      .pipe(
        // Validación de respuesta de la API
        map(response => this.validateApiResponse(response)),

        // Reintento automático en caso de error de red (1 vez)
        retry(1),

        // Caché de respuesta para múltiples suscriptores simultáneos
        shareReplay(1),

        // Manejo centralizado de errores
        catchError(error => this.handleError(error, city))
      );
  }

  /**
   * Construye los parámetros de consulta HTTP de forma segura
   *
   * @param queryParams - Parámetros de consulta para la API
   * @returns HttpParams configurado
   */
  private buildQueryParams(queryParams: WeatherQueryParams): HttpParams {
    let params = new HttpParams()
      .set('access_key', queryParams.access_key)
      .set('query', queryParams.query);

    // Solo agregar units si está definido
    if (queryParams.units) {
      params = params.set('units', queryParams.units);
    }

    return params;
  }

  /**
   * Valida la respuesta de la API y detecta errores
   *
   * La API de WeatherStack puede devolver un objeto de error
   * en lugar de los datos del clima cuando ocurre un problema.
   *
   * @param response - Respuesta de la API
   * @returns Datos del clima validados
   * @throws Error si la respuesta contiene un error de la API
   */
  private validateApiResponse(response: Weather | { error: WeatherApiError }): Weather {
    // Verificar si la respuesta contiene un error
    if ('error' in response && response.error) {
      const apiError = response.error;
      throw new Error(
        `Error de WeatherStack API (${apiError.code}): ${apiError.info}`
      );
    }

    // Verificar que la respuesta tenga la estructura esperada
    if (!('current' in response) || !('location' in response)) {
      throw new Error('Respuesta de la API con formato inválido');
    }

    return response as Weather;
  }

  /**
   * Manejo centralizado de errores del servicio
   *
   * Transforma los diferentes tipos de errores en mensajes
   * descriptivos y fáciles de entender para el usuario.
   *
   * @param error - Error capturado
   * @param city - Ciudad consultada (para contexto)
   * @returns Observable que emite el error transformado
   */
  private handleError(error: Error | HttpErrorResponse, city: string): Observable<never> {
    let errorMessage = 'Error al obtener el clima';

    if (error instanceof HttpErrorResponse) {
      // Errores HTTP del servidor
      if (error.status === 0) {
        // Error de red o CORS
        errorMessage = 'No se pudo conectar con el servidor de WeatherStack. Verifica tu conexión a internet.';
      } else if (error.status === 401) {
        // Error de autenticación
        errorMessage = 'API Key inválida o no autorizada. Verifica tu configuración en environment.ts';
      } else if (error.status === 404) {
        // Ciudad no encontrada
        errorMessage = `No se encontró información del clima para "${city}". Verifica el nombre de la ciudad.`;
      } else if (error.status === 429) {
        // Límite de rate excedido
        errorMessage = 'Has excedido el límite de solicitudes. Intenta de nuevo más tarde.';
      } else if (error.status >= 500) {
        // Error del servidor
        errorMessage = 'El servidor de WeatherStack no está disponible. Intenta de nuevo más tarde.';
      } else {
        // Otros errores HTTP
        errorMessage = `Error HTTP ${error.status}: ${error.statusText}`;
      }

      // Logging para debugging (en producción, usar un servicio de logging real)
      console.error('Error HTTP:', {
        status: error.status,
        message: error.message,
        url: error.url,
        city
      });
    } else {
      // Errores de lógica o validación
      errorMessage = error.message || errorMessage;

      console.error('Error en WeatherService:', {
        message: error.message,
        city
      });
    }

    // Retornar observable de error con mensaje descriptivo
    return throwError(() => new Error(errorMessage));
  }
}
