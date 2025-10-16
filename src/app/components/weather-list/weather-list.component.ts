import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-weather-list',
  imports: [],
  templateUrl: './weather-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherListComponent { }
