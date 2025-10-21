import { Routes } from '@angular/router';
import { WeatherDashboardComponent } from './weather-dashboard/weather-dashboard.component';

export const routes: Routes = [
  {
    path: 'home',
    component: WeatherDashboardComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
