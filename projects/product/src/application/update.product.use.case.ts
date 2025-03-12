import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { IUpdateProductRequest } from '../domain/model/IUpdateProductRequest';
import { IUpdateProductResponse } from '../domain/model/IUpdateProductResponse';
import { ErrorHandlingService } from '../infrastructure/services/error.handle.service';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateProductUseCase {
  private readonly _service = inject(ProductApiService);
  private readonly _store = inject(ProductStoreService);
  private readonly _errorHandler = inject(ErrorHandlingService);

  execute(id: string, product: IUpdateProductRequest): Observable<IUpdateProductResponse> {
    this._store.setLoading(true);
    return this._service.updateProduct(id, product).pipe(
      tap(response => {
        this._store.updateProduct(id, response.data);
      }),
      catchError((error) => {
        console.error(`Error updating product with ID ${id}:`, error);
        return this._errorHandler.handleError(error, `Error updating product with ID ${id}`);
      }),
      finalize(() => {
        this._store.setLoading(false);
      })
    );
  }
}