import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-weather-dashboard',
  imports: [SearchBarComponent],
  templateUrl: './weather-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDashboardComponent {}
