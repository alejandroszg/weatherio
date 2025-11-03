import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { WeatherResponse } from '../../../interfaces';
import { Button } from 'primeng/button';
import { GeolocationService } from '../../../services/geolocation.service';
import { Chip } from 'primeng/chip';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-current-weather',
  imports: [CardModule, DividerModule, Button, Chip, Skeleton],
  templateUrl: './current-weather.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent implements AfterViewInit {
  @Input() weatherData: WeatherResponse | undefined;
  @Input() isLoading: boolean = false;
  @Output() locationRequested = new EventEmitter<string>();

  constructor(
    private cdr: ChangeDetectorRef,
    private geolocationService: GeolocationService
  ) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  checkLocation() {
    this.geolocationService.getCurrentLocation().subscribe({
      next: (coords) => {
        // Weatherstack API acepta coordenadas en formato "lat,lon"
        const locationQuery = `${coords.latitude},${coords.longitude}`;
        this.locationRequested.emit(locationQuery);
      },
      error: (error) => {
        console.error('Error getting location:', error);
        alert(
          'No se pudo obtener tu ubicación. Por favor, verifica los permisos del navegador.'
        );
      },
    });
  }

  searchSuggestedCity(city: string) {
    console.log(city);
    this.locationRequested.emit(city);
  }
}
