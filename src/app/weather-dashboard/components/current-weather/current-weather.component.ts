import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  imports: [],
  templateUrl: './current-weather.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent { }
