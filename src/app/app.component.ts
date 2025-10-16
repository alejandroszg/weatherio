import { Component } from '@angular/core';
import { WeatherHeaderComponent } from './components/weather-header/weather-header.component';
import { WeatherHeroComponent } from './components/weather-hero/weather-hero.component';
import { WeatherListComponent } from './components/weather-list/weather-list.component';

@Component({
  selector: 'app-root',
  imports: [WeatherHeaderComponent, WeatherHeroComponent, WeatherListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weatherio';
}
