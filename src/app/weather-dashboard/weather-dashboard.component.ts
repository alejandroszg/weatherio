import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { WeatherService } from '../services/weather.service';
import { WeatherResponse } from '../interfaces';
import { ErrorResponse } from '../interfaces/error.interface';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-weather-dashboard',
  imports: [SearchBarComponent, CurrentWeatherComponent, Toast],
  templateUrl: './weather-dashboard.component.html',
  providers: [MessageService],
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
    private messageService: MessageService
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
      error: (error: HttpErrorResponse | ErrorResponse) => {
        this.isLoading = false;
        this.errorResponse = true;
        this.showErrorToast(error);
        this.cdr.detectChanges();
      },
    });
  }

  showErrorToast(error: HttpErrorResponse | ErrorResponse) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.error.error.info,
    });
  }
}
