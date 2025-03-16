import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ErrorHandlingService } from '../infrastructure/services/error.handle.service';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class ProductExistsUseCase {
  constructor(
    private readonly _service: ProductApiService,
    private readonly _store: ProductStoreService,
    private readonly _errorHandler: ErrorHandlingService,
  ) {}

  execute(id: string): Observable<boolean> {
    this._store.setLoading(true);
    return this._service.productExists(id).pipe(
      catchError((error) => {
        console.error('Error checking if product exists:', error);
        return this._errorHandler.handleError(error, `Error checking if product with ID ${id} exists`);
      }),
      finalize(() => {
        this._store.setLoading(false);
      })
    );
  }
}