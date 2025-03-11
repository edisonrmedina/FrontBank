import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '../domain/model/IProduct';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class SelectProductCase {
  private readonly _service = inject(ProductApiService);
  private readonly _store = inject(ProductStoreService);

  execute(product: IProduct): Observable<boolean> {
    this._store.setSelectedProduct(product);
    return of(true);
  }

}
