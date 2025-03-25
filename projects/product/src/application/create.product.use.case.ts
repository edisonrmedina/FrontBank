import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap } from 'rxjs';
import { ErrorHandlingService, ICreateProductRequest, ICreateProductResponse, IUseCase, ProductStoreService } from 'shared';
import { ProductApiService } from '../infrastructure/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class CreateProductUseCase implements IUseCase<ICreateProductRequest, ICreateProductResponse> {
  constructor(
    private readonly _service: ProductApiService,
    private readonly _store: ProductStoreService,
    private readonly _errorHandler: ErrorHandlingService,
  ) {}

  execute(product: ICreateProductRequest): Observable<ICreateProductResponse> {
    //this._store.setLoading(true);
    return this._service.createProduct(product).pipe(
      tap((response) => this._store.addProduct(response.data)),
      catchError((error) =>
        this._errorHandler.handleError(
          error,
          `Product creation failed: ${product.name}`
        )
      ),
      finalize(() => this._store.setLoading(false))
    );
  }

}


