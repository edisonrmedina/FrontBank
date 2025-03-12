import { inject, Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap } from 'rxjs';
import { IDeleteProductResponse } from '../domain/model/IDeleteProductResponse';
import { ErrorHandlingService } from '../infrastructure/services/error.handle.service';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteProductUseCase {
  private readonly _service = inject(ProductApiService);
  private readonly _store = inject(ProductStoreService);
  private readonly _errorHandlingService = inject(ErrorHandlingService);

  execute(id: string): Observable<IDeleteProductResponse> {
    this._store.setLoading(true); // Optionally handle loading state
    this._store.deleteProduct(id);
    return this._service.deleteProduct(id).pipe(
      tap(() => {
        // alert store -> this._alertService.success(`Product with ID ${id} deleted successfully!`)),
      }),
      catchError((error) =>
        this._errorHandlingService.handleError(error, `Product deletion failed: ${id}`)
      ),
      finalize(() => this._store.setLoading(false))
    );
  }

}
