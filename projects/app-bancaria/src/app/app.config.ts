import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { enableAkitaProdMode, persistState } from '@datorama/akita';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { routes } from './app.routes';


if (!isDevMode()) {
  enableAkitaProdMode();
}


const persistStorage = persistState({
  include: ['product'], 
  key: 'akitaStore',
  storage: sessionStorage
});

const providers = [
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(),
  { provide: 'persistStorage', useValue: persistStorage }
];

if (isDevMode()) {
  providers.push(importProvidersFrom(AkitaNgDevtools.forRoot()));
}

export const appConfig: ApplicationConfig = {
  providers: providers
};