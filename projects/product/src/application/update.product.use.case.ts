import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ErrorHandlingService, IUpdateProductInput, IUpdateProductResponse, IUseCase, ProductStoreService, ToastService } from 'shared';
import { ProductApiService } from '../infrastructure/services/product.service';


@Injectable({
  providedIn: 'root',
})
export class UpdateProductUseCase implements IUseCase<IUpdateProductInput, IUpdateProductResponse> {
  constructor(
    private readonly _service: ProductApiService,
    private readonly _store: ProductStoreService,
    private readonly _errorHandler: ErrorHandlingService,
    private readonly _toastService: ToastService
  ) {}

  execute(input: IUpdateProductInput): Observable<IUpdateProductResponse> {
    debugger;
    this._store.setLoading(true);
    return this._service.updateProduct(input.id, input.product).pipe(
      tap(response => {
        this._store.updateProduct(input.id, response.data);
        this._toastService.showToast(
          'Operación Exitosa',
          `Producto "${input.product.name}" actualizado correctamente`,
          'success'
        );
      }),
      catchError((error) => {
        console.error(`Error updating product with ID ${input.id}:`, error);
        this._errorHandler.handleError(error, `Error updating product with ID ${input.id}`);
        return throwError(() => error);
      }),
      finalize(() => {
        this._store.setLoading(false);
      })
    );
  }
}