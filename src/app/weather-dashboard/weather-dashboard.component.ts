import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { WeatherService, RateLimitError } from '../services/weather.service';
import { WeatherResponse } from '../interfaces';
import { ErrorResponse } from '../interfaces/error.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-weather-dashboard',
  imports: [SearchBarComponent, CurrentWeatherComponent],
  templateUrl: './weather-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDashboardComponent {
  receivedCity: string = '';
  APIdata: WeatherResponse | undefined;
  isLoading: boolean = false;
  errorResponse: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  onReceivedCity(city: string) {
    this.receivedCity = city;
    this.requestCity(city);
  }

  requestCity(cityCountry: string) {
    this.isLoading = true;
    this.errorResponse = false;
    this.weatherService.getCurrentWeather(cityCountry).subscribe({
      next: (data) => {
        this.APIdata = data;
        this.isLoading = false;
        this.errorResponse = false;
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse | ErrorResponse | RateLimitError) => {
        this.isLoading = false;
        this.errorResponse = true;

        if (error instanceof RateLimitError) {
          this.toastService.showError('Query limit', error.message);
        } else {
          const errorDetail = error.error?.error?.info || 'Unknown error';
          this.toastService.showError('Error', errorDetail);
        }

        this.cdr.detectChanges();
      },
    });
  }
}
