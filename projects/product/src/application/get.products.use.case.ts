import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorHandlingService, IProduct, IUseCase, ProductStoreService, ToastService } from 'shared';
import { ProductApiService } from '../infrastructure/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class GetAllProductsUseCase implements IUseCase<void, IProduct[]> {
  constructor(
    private readonly _service: ProductApiService,
    private readonly _store: ProductStoreService,
    private readonly _errorHandler: ErrorHandlingService,
    private readonly _toastService: ToastService
  ) {}

  execute(): Observable<IProduct[]> {
    this._store.setLoading(true);
    return this._service.getAllProducts().pipe(
      map((response) => {
        if (response.data.length === 0) {
          this._toastService.showToast('Advertencia','No se encontraron productos', 'warning',);
        }
        return response.data;
      }), // Extrae los datos
      tap((products) => {
        this._store.setProducts(products);
      }),
      catchError((error) => {
        console.error('Error al obtener los productos:', error);
        this._errorHandler.handleError(error, 'Error fetching all products');
        return throwError(() => error); // Re-lanza el error
      }),
      finalize(() => {
        this._store.setLoading(false);
      })
    );
  }
}