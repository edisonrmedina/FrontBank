import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ProductStore } from './product.store';
import { ProductState } from './state';


@Injectable({ providedIn: 'root' })
export class ProductQuery extends Query<ProductState> {
  constructor(protected override store: ProductStore) {
    super(store);
  }
  selectAll() {
    return this.select(state => state.products);
  }
  
}
