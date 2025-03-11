import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { createInitialState,  } from './state';
import { IProductState } from '../model/iProductState';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'product' })
export class ProductStore extends Store<IProductState> {
  constructor() {
    super(createInitialState());
  }
}
