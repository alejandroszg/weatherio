import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherResponse } from '../interfaces';
import { environment } from '../../../.environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiKey = environment.weatherstack.apiKey;
  private readonly baseUrl = environment.weatherstack.baseUrl;
  private readonly units: string = 'm';
  private readonly currentWeatherUrl = `${this.baseUrl}/current`;
  private readonly forecastWeatherUrl = `${this.baseUrl}/forecast`;

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<WeatherResponse> {
    // HttpParams construye query parameters de forma segura
    // Resultado: ?access_key=TU_API_KEY&query=NOMBRE_CIUDAD
    const params = new HttpParams()
      .set('access_key', this.apiKey)
      .set('query', city)
      .set('units', this.units);

    // http.get<T>() realiza una petición GET y tipea la respuesta como T
    // El objeto { params } pasa los parámetros de query a la URL
    return this.http.get<WeatherResponse>(this.baseUrl, { params });
  }
}
