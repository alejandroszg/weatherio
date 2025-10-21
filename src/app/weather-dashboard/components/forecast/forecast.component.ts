import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TemperatureRangeBarComponent } from '../temperature-range-bar/temperature-range-bar.component';

@Component({
  selector: 'app-forecast',
  imports: [TemperatureRangeBarComponent],
  templateUrl: './forecast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent {}
