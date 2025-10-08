import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-weather-header',
  imports: [],
  templateUrl: './weather-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherHeaderComponent { }
