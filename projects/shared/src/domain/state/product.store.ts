import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IProductState } from '../model/IProductState';
import { createInitialState, } from './state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'product' })
export class ProductStore extends Store<IProductState> {
  constructor() {
    super(createInitialState());
  }
}
