import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { enableAkitaProdMode, persistState } from '@datorama/akita';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { routes } from './app.routes';

// Configure Akita for production mode
if (!isDevMode()) {
  enableAkitaProdMode();
}

// Configure persistence for Akita stores
const persistStorage = persistState({
  include: ['product'], // Store names you want to persist
  key: 'akitaStore',
  storage: sessionStorage
});

const providers = [
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(),
  { provide: 'persistStorage', useValue: persistStorage }
];

// Add DevTools only in development mode
if (isDevMode()) {
  providers.push(importProvidersFrom(AkitaNgDevtools.forRoot()));
}

export const appConfig: ApplicationConfig = {
  providers: providers
};