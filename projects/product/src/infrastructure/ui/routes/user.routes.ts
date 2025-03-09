import { Routes } from '@angular/router';
import { DesignOneContainerComponent } from '../containers/design.one.container/design.one.container.component';

export const productRoutes: Routes = [
  {
    path: '',
    redirectTo: 'design/1', 
    pathMatch: 'full',
  },
  {
    path: 'design/:id',
    component: DesignOneContainerComponent,
  },
  {
    path: '**',
    redirectTo: 'design/1', 
  },
];
