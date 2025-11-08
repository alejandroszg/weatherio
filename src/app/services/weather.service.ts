import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherResponse } from '../interfaces';
import { environment } from '../../environments/environment';
import { RateLimitService } from './rate-limit.service';
import { CacheService } from './cache.service';

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiKey = environment.weatherstack.apiKey;
  private readonly baseUrl = environment.weatherstack.baseUrl;
  private readonly units: string = 'm';

  constructor(
    private http: HttpClient,
    private rateLimitService: RateLimitService,
    private cacheService: CacheService
  ) {}

  getCurrentWeather(city: string): Observable<WeatherResponse> {
    const cachedData = this.cacheService.get(city);
    if (cachedData) {
      return of(cachedData);
    }

    if (!this.rateLimitService.canMakeRequest()) {
      return throwError(
        () =>
          new RateLimitError(
            'You have reached the query limit. Please try again later.'
          )
      );
    }

    const params = new HttpParams()
      .set('access_key', this.apiKey)
      .set('query', city)
      .set('units', this.units);

    return this.http.get<WeatherResponse>(this.baseUrl, { params }).pipe(
      map((response) => {
        this.cacheService.set(city, response);
        this.rateLimitService.incrementCounter();
        return response;
      })
    );
  }
}
