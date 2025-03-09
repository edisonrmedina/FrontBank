import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('product').then((m) => m.productRoutes),
  },
  
];
