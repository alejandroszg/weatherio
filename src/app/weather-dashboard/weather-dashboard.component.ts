import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { WeatherService } from '../services/weather.service';
import { WeatherResponse } from '../interfaces';

@Component({
  selector: 'app-weather-dashboard',
  imports: [SearchBarComponent, CurrentWeatherComponent],
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
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('Error en la consulta.');
      },
    });
  }
}
