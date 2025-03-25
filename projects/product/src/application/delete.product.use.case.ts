import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { ErrorHandlingService, IDeleteProductResponse, IUseCase, ProductStoreService } from 'shared';
import { ProductApiService } from '../infrastructure/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteProductUseCase implements IUseCase<string, IDeleteProductResponse> {
  constructor(
    private readonly _service: ProductApiService,
    private readonly _store: ProductStoreService,
    private readonly _errorHandler: ErrorHandlingService,
    // private readonly _alertService: AlertService // Opcional
  ) {}

  execute(id: string): Observable<IDeleteProductResponse> {
    //this._store.setLoading(true);

    return this._service.deleteProduct(id).pipe(
      tap(() => {
        this._store.deleteProduct(id); // Eliminar del store solo si la API confirma el éxito
        // this._alertService.success(`Product with ID ${id} deleted successfully!`); // Opcional
      }),
      catchError((error) => {
        this._errorHandler.handleError(error, `Product deletion failed: ${id}`);
        return throwError(() => error); // Re-lanzar el error
      }),
      finalize(() => this._store.setLoading(false))
    );
  }
}