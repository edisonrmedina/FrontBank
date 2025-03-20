import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { IProduct } from '../domain/model/IProduct';
import { IUseCase } from '../domain/model/IUseCase';
import { ErrorHandlingService } from '../infrastructure/services/error.handle.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class SelectProductCase implements IUseCase<IProduct, boolean> {
  constructor(
    private readonly _store: ProductStoreService,
    private readonly _errorHandler: ErrorHandlingService
  ) {}
  execute(product: IProduct): Observable<boolean> {
    this._store.setLoading(true);
    return of(this._store.setSelectedProduct(product)).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Error selecting product:', error);
        this._errorHandler.handleError(
          error,
          `Error selecting product with ID ${product.id}`
        );
        return of(false);
      }),
      finalize(() => this._store.setLoading(false))
    );
  }
}
