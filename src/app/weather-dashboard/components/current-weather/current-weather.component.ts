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
import { Message } from 'primeng/message';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../../interfaces/error.interface';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-current-weather',
  imports: [CardModule, DividerModule, Button, Chip, Skeleton, Message],
  templateUrl: './current-weather.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent implements AfterViewInit {
  @Input() weatherData: WeatherResponse | undefined;
  @Input() isLoading: boolean = false;
  @Input() errorResponse: boolean = false;
  @Output() locationRequested = new EventEmitter<string>();

  constructor(
    private cdr: ChangeDetectorRef,
    private geolocationService: GeolocationService,
    private toastService: ToastService
  ) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  checkLocation() {
    this.geolocationService.getCurrentLocation().subscribe({
      next: (coords) => {
        const locationQuery = `${coords.latitude},${coords.longitude}`;
        this.locationRequested.emit(locationQuery);
      },
      error: (error: HttpErrorResponse | ErrorResponse) => {
        this.isLoading = false;
        this.errorResponse = true;
        const errorDetail =
          error.error?.error?.info || 'Error al obtener la ubicación';
        this.toastService.showError('Error', errorDetail);
        this.cdr.detectChanges();
      },
    });
  }

  searchSuggestedCity(city: string) {
    console.log(city);
    this.locationRequested.emit(city);
  }

  reloadPage() {
    window.location.reload();
  }
}
