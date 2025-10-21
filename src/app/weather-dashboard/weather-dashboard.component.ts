import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';

@Component({
  selector: 'app-weather-dashboard',
  imports: [SearchBarComponent, CurrentWeatherComponent],
  templateUrl: './weather-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDashboardComponent {}
