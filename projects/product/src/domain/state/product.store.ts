import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { createInitialState, ProductState } from './state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'product' })
export class ProductStore extends Store<ProductState> {
  constructor() {
    super(createInitialState());
  }
}
