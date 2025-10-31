import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  getCurrentLocation(): Observable<GeolocationCoordinates> {
    return new Observable((observer) => {
      if (!navigator.geolocation) {
        observer.error('Geolocation is not supported by this browser');
        return;
      }

      const watchId = navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      // Cleanup function - se ejecuta cuando se desuscribe el Observable
      return () => {
        // getCurrentPosition no retorna ID, pero agregamos la lógica por buenas prácticas
        // Si usaras watchPosition en el futuro, aquí harías clearWatch(watchId)
      };
    });
  }
}
