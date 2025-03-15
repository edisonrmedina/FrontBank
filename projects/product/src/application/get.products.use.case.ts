import { inject, Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap } from 'rxjs';
import { IProduct } from '../domain/model/IProduct';
import { ProductQuery } from '../domain/state/product.query';
import { ErrorHandlingService } from '../infrastructure/services/error.handle.service';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class GetAllProductsUseCase {
  private readonly _service = inject(ProductApiService);
  private readonly _store = inject(ProductStoreService);
  private readonly _query = inject(ProductQuery);
  private readonly _errorHandlingService = inject(ErrorHandlingService);

  products$(): Observable<IProduct[]> {
    return this._query.selectAll();
  }

  execute(): void {
    this._store.setLoading(true); 

    this._service.getAllProducts().pipe(
      tap(response => {
        this._store.setProducts(response.data);
      }),
      catchError((error) => {
        console.error('Error al obtener los productos:', error);
        return this._errorHandlingService.handleError(error, 'Error fetching all products');
      }),
      finalize(() => {
        this._store.setLoading(false);
      })
    ).subscribe();
  }
}
