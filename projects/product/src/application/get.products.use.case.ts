import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IProduct } from '../domain/model/IProduct';
import { ProductQuery } from '../domain/state/product.query';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class GetAllProductsUseCase {
  private readonly _service = inject(ProductApiService);
  private readonly _store = inject(ProductStoreService);
  private readonly _query = inject(ProductQuery);

  //#region Observables
  products$(): Observable<IProduct[]> {
    return this._query.selectAll();
  }
  //#endregion

  //#region Public Methods
  execute(): void {
    this._service.getAllProducts()
      .pipe(
        tap(response => {
          this._store.setProducts(response.data); // Almacena los productos en Akita Store
        })
      )
      .subscribe();
  }
  //#endregion
}
