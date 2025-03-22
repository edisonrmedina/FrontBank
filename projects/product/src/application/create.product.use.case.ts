import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap } from 'rxjs';
import { ICreateProductRequest } from '../domain/model/ICreateProductRequest';
import { ICreateProductResponse } from '../domain/model/ICreateProductResponse';
import { IUseCase } from '../domain/model/IUseCase';
import { ErrorHandlingService } from '../infrastructure/services/error.handle.service';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class CreateProductUseCase implements IUseCase<ICreateProductRequest,ICreateProductResponse> {
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
