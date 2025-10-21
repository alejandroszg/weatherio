import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-forecast',
  imports: [],
  templateUrl: './forecast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent { }
