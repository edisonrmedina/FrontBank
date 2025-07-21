import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IProductState } from "../model/IProductState";
import { ProductStore } from './product.store';


@Injectable({ providedIn: 'root' })
export class ProductQuery extends Query<IProductState> {
  constructor(protected override store: ProductStore) {
    super(store);
  }
  selectAll() {
    return this.select(state => state.products);
  }

  selectSelectedProduct() {
    return this.select(state => state.selectedProduct);
  }
  
}
