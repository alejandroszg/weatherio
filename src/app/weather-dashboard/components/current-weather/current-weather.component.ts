import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-current-weather',
  imports: [CardModule, DividerModule],
  templateUrl: './current-weather.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent {}
