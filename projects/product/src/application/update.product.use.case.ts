import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { IUpdateProductRequest } from '../domain/model/IUpdateProductRequest';
import { IUpdateProductResponse } from '../domain/model/IUpdateProductResponse';
import { IUseCase } from '../domain/model/IUseCase';
import { ErrorHandlingService } from '../infrastructure/services/error.handle.service';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

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