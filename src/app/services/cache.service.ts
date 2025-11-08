import { Injectable } from '@angular/core';
import { WeatherResponse } from '../interfaces';

interface CacheEntry {
  data: WeatherResponse;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private readonly CACHE_PREFIX = 'weatherio_cache_';
  private readonly TTL_MINUTES = 30;

  constructor() {}

  get(city: string): WeatherResponse | null {
    const key = this.getCacheKey(city);
    const cached = localStorage.getItem(key);

    if (!cached) {
      return null;
    }

    try {
      const entry: CacheEntry = JSON.parse(cached);
      const isExpired = this.isExpired(entry.timestamp);

      if (isExpired) {
        localStorage.removeItem(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      localStorage.removeItem(key);
      return null;
    }
  }

  set(city: string, data: WeatherResponse): void {
    const key = this.getCacheKey(city);
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
    };

    try {
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }

  has(city: string): boolean {
    return this.get(city) !== null;
  }

  private getCacheKey(city: string): string {
    const normalized = city.toLowerCase().trim();
    return `${this.CACHE_PREFIX}${normalized}`;
  }

  private isExpired(timestamp: number): boolean {
    const now = Date.now();
    const ttlMilliseconds = this.TTL_MINUTES * 60 * 1000;
    return now - timestamp > ttlMilliseconds;
  }

  clearAll(): void {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }
}
