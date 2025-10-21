import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-weather-dashboard',
  imports: [],
  templateUrl: './weather-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDashboardComponent { }
