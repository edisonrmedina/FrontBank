import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../domain/model/IProduct';
import { ProductQuery } from '../domain/state/product.query';

@Injectable({
  providedIn: 'root',
})
export class GetSelectedProductCase {
  private readonly _query = inject(ProductQuery);

  execute(): Observable<IProduct | null> {
    return this._query.selectSelectedProduct();
  }
}
