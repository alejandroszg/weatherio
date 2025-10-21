import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastComponent } from './components/forecast/forecast.component';

@Component({
  selector: 'app-weather-dashboard',
  imports: [SearchBarComponent, CurrentWeatherComponent, ForecastComponent],
  templateUrl: './weather-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDashboardComponent {}
