import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { ErrorHandlingService, IDeleteProductResponse, IUseCase, ProductStoreService, ToastService } from 'shared';
import { ProductApiService } from '../infrastructure/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteProductUseCase implements IUseCase<string, IDeleteProductResponse> {

  constructor(
    private readonly _service: ProductApiService,
    private readonly _store: ProductStoreService,
    private readonly _errorHandler: ErrorHandlingService,
    private readonly _toastService: ToastService
  ) {}

  execute(id: string): Observable<IDeleteProductResponse> {
    this._store.setLoading(true);
    return this._service.deleteProduct(id).pipe(
      tap(() => {
        this._store.deleteProduct(id);
        this._toastService.showToast(
          'Operación Exitosa',
          `Producto eliminado correctamente`,
          'success'
        );
      }),
      catchError((error) => {
        this._errorHandler.handleError(error, `Product deletion failed: ${id}`);
        return throwError(() => error);
      }),
      finalize(() => this._store.setLoading(false))
    );
  }
  
}