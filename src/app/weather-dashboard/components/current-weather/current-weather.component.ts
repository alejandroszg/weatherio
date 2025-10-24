import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { WeatherResponse } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-weather',
  imports: [CardModule, DividerModule, CommonModule],
  templateUrl: './current-weather.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent implements AfterViewInit {
  @Input() weatherData: WeatherResponse | undefined;

  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
