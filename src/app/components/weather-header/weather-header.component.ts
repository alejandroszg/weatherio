import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-header',
  imports: [FormsModule],
  templateUrl: './weather-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherHeaderComponent {
  private weatherService = inject(WeatherService);

  searchCity = '';

  /**
   * Busca el clima de la ciudad ingresada
   */
  onSearch(): void {
    if (!this.searchCity.trim()) {
      console.warn('Por favor ingresa una ciudad');
      return;
    }

    console.log(`🔍 Buscando clima para: ${this.searchCity}`);

    this.weatherService.getCurrentWeather(this.searchCity).subscribe({
      next: (weather) => {
        console.log('✅ Datos del clima obtenidos:', weather);
        console.log(`📍 Ubicación: ${weather.location.name}, ${weather.location.country}`);
        console.log(`🌡️ Temperatura: ${weather.current.temperature}°C`);
        console.log(`☁️ Descripción: ${weather.current.weather_descriptions[0]}`);
        console.log(`💨 Viento: ${weather.current.wind_speed} km/h`);
        console.log(`💧 Humedad: ${weather.current.humidity}%`);
      },
      error: (error) => {
        console.error('❌ Error al obtener el clima:', error.message);
      }
    });
  }
}
