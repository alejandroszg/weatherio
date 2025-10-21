import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-temperature-range-bar',
  imports: [CommonModule],
  templateUrl: './temperature-range-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemperatureRangeBarComponent {
  // Inputs Signals
  day = input.required<string>();
  tempMin = input.required<number>();
  tempMax = input.required<number>();
  globalMin = input.required<number>();
  globalMax = input.required<number>();

  // Cálculos automáticos usando signals
  temperatureRange = computed(() => {
    const globalRange = this.globalMax() - this.globalMin();
    const dayRange = this.tempMax() - this.tempMin();

    // Calcular posición izquierda de la barra (en %)
    const leftPosition =
      ((this.tempMin() - this.globalMin()) / globalRange) * 100;

    // Calcular ancho de la barra (en %)
    const width = (dayRange / globalRange) * 100;

    // Temperatura promedio para determinar color
    const avgTemp = (this.tempMin() + this.tempMax()) / 2;

    return {
      leftPosition,
      width,
      avgTemp,
    };
  });

  // Color dinámico basado en temperatura
  barColor = computed(() => {
    const avgTemp = this.temperatureRange().avgTemp;

    if (avgTemp < 10) return 'bg-blue-600';
    if (avgTemp < 15) return 'bg-blue-400';
    if (avgTemp < 20) return 'bg-green-500';
    if (avgTemp < 25) return 'bg-yellow-400';
    if (avgTemp < 30) return 'bg-orange-500';
    return 'bg-red-500';
  });
}
