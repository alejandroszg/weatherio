import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { Divider } from 'primeng/divider';
import { WeatherService } from '../services/weather.service';
import { WeatherResponse } from '../interfaces';

@Component({
  selector: 'app-weather-dashboard',
  imports: [
    SearchBarComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    Divider,
  ],
  templateUrl: './weather-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDashboardComponent {
  receivedCity: string = '';
  APIdata: WeatherResponse | undefined;

  constructor(
    private WeatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) {}

  onReceivedCity(city: string) {
    this.receivedCity = city;
    this.requestCity(city);
  }

  requestCity(cityCountry: string) {
    this.WeatherService.getCurrentWeather(cityCountry).subscribe({
      next: (data) => {
        this.APIdata = data;
        console.log(this.APIdata);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('Error en la consulta.');
      },
    });
  }
}
