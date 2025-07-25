import { Routes } from '@angular/router';
import { BankComponent } from '../components/createBank/create-bank.component';
import { DesignOneContainerComponent } from '../containers/design.one.container/design.one.container.component';

export const productRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home', 
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: DesignOneContainerComponent,
  },
  {
    path: 'create',
    component:BankComponent 
  },
  {
    path: '**',
    redirectTo: 'home', 
  },
];
 