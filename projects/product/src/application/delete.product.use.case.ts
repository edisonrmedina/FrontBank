import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IDeleteProductResponse } from '../domain/model/IDeleteProductResponse';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteProductUseCase {
  private readonly _service = inject(ProductApiService);
  private readonly _store = inject(ProductStoreService);

  execute(id: string): Observable<IDeleteProductResponse> {
    return this._service.deleteProduct(id).pipe(
      tap(() => {
        this._store.deleteProduct(id);
      })
    );
  }
}
