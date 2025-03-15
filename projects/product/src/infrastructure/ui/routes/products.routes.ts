import { Routes } from '@angular/router';
import { ModalBankComponent } from '../components/createBank/create-bank.component';
import { DesignOneContainerComponent } from '../containers/design.one.container/design.one.container.component';

export const productRoutes: Routes = [
  {
    path: '',
    redirectTo: 'design/2', 
    pathMatch: 'full',
  },
  {
    path: 'design/:id',
    component: DesignOneContainerComponent,
  },
  {
    path: 'create',
    component:ModalBankComponent 
  },
  {
    path: '**',
    redirectTo: 'design/1', 
  },
];
