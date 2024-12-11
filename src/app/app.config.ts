import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {finalize} from 'rxjs';
import {authInterceptor, backendInterceptor, errorInterceptor} from '../tools/interceptor/backend.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // détecter les changements de valeurs des variables
    provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: "enabled"})), // détecte les changements dans l'URL
    provideHttpClient(withInterceptors([
      backendInterceptor,
      authInterceptor,
      errorInterceptor
    ])) // permet de faire des requetes
  ]
};
