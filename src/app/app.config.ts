import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(), // Habilita HttpClient para peticiones HTTP
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || 'none',
        },
      },
    }),
    provideRouter(routes),
  ],
};
