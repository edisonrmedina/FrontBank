import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUpdateProductRequest } from '../domain/model/IUpdateProductRequest';
import { IUpdateProductResponse } from '../domain/model/IUpdateProductResponse';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateProductUseCase {
  private readonly _service = inject(ProductApiService);
  private readonly _store = inject(ProductStoreService);

  //#region Public Methods
  execute(id: string, product: IUpdateProductRequest): Observable<IUpdateProductResponse> {
    return this._service.updateProduct(id, product).pipe(
      tap(response => {
        this._store.updateProduct(id, response.data); 
      })
    );
  }
}
