import { inject, Injectable } from '@angular/core';
import { catchError, finalize, tap } from 'rxjs';
import { ProductQuery } from '../domain/state/product.query';
import { ErrorHandlingService } from '../infrastructure/services/error.handle.service';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class GetAllProductsUseCase {
  constructor(
    private readonly _service: ProductApiService,
    private readonly _store: ProductStoreService,
    private readonly _errorHandler: ErrorHandlingService,
  ) {}
  execute(): void {
    this._store.setLoading(true); 

    this._service.getAllProducts().pipe(
      tap(response => {
        this._store.setProducts(response.data);
      }),
      catchError((error) => {
        console.error('Error al obtener los productos:', error);
        return this._errorHandler.handleError(error, 'Error fetching all products');
      }),
      finalize(() => {
        this._store.setLoading(false);
      })
    ).subscribe();
  }
}
