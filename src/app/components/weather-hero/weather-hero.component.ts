import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-weather-hero',
  imports: [],
  templateUrl: './weather-hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherHeroComponent { }
