import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { IProduct } from '../domain/model/IProduct';
import { ErrorHandlingService } from '../infrastructure/services/error.handle.service';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class SelectProductCase {
  private readonly _service = inject(ProductApiService); // No se usa, se puede eliminar
  private readonly _store = inject(ProductStoreService);
  private readonly _errorHandler = inject(ErrorHandlingService);

  execute(product: IProduct): Observable<boolean> {
    this._store.setLoading(true);
    this._store.setSelectedProduct(product)
    return of(true).pipe( // Usamos of(true) para crear un Observable
      tap(() => this._store.setSelectedProduct(product)),
      catchError((error) => {
        console.error('Error selecting product:', error);
        return this._errorHandler.handleError(error, `Error selecting product with ID ${product.id}`);
      }),
      finalize(() => this._store.setLoading(false))
    );
  }
}