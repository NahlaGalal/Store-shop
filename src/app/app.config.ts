import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { filterProductsReducer } from './store/reducers/filterProducts.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState({ name: 'list', reducer: filterProductsReducer }),
  ],
};
