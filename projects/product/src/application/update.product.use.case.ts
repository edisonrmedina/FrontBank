import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ErrorHandlingService, IUseCase, ProductStoreService } from 'shared';
import { IUpdateProductRequest } from '../../../shared/src/domain/model/IUpdateProductRequest';
import { IUpdateProductResponse } from '../../../shared/src/domain/model/IUpdateProductResponse';
import { ProductApiService } from '../infrastructure/services/product.service';

interface UpdateProductInput {
  id: string;
  product: IUpdateProductRequest;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateProductUseCase implements IUseCase<UpdateProductInput, IUpdateProductResponse> {
  constructor(
    private readonly _service: ProductApiService,
    private readonly _store: ProductStoreService,
    private readonly _errorHandler: ErrorHandlingService,
  ) {}

  execute(input: UpdateProductInput): Observable<IUpdateProductResponse> {
    //this._store.setLoading(true);
    return this._service.updateProduct(input.id, input.product).pipe(
      tap(response => {
        this._store.updateProduct(input.id, response.data);
      }),
      catchError((error) => {
        console.error(`Error updating product with ID ${input.id}:`, error);
        this._errorHandler.handleError(error, `Error updating product with ID ${input.id}`);
        return throwError(() => error); // Re-lanzar el error
      }),
      finalize(() => {
        this._store.setLoading(false);
      })
    );
  }
}