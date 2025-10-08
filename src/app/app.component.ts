import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherHeaderComponent } from './components/weather-header/weather-header.component';

@Component({
  selector: 'app-root',
  imports: [WeatherHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weatherio';
}
