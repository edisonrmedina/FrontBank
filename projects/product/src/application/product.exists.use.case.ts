import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ErrorHandlingService } from '../infrastructure/services/error.handle.service';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class ProductExistsUseCase {
  private readonly _service = inject(ProductApiService);
  private readonly _store = inject(ProductStoreService);
  private readonly _errorHandler = inject(ErrorHandlingService);

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