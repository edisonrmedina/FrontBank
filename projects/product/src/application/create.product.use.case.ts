import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap } from 'rxjs';
import { ErrorHandlingService, ICreateProductRequest, ICreateProductResponse, IUseCase, ProductStoreService, ToastService } from 'shared';
import { ProductApiService } from '../infrastructure/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class CreateProductUseCase implements IUseCase<ICreateProductRequest, ICreateProductResponse> {
  constructor(
    private readonly _service: ProductApiService,
    private readonly _store: ProductStoreService,
    private readonly _errorHandler: ErrorHandlingService,
    private readonly _toastService: ToastService
  ) {}

  execute(product: ICreateProductRequest): Observable<ICreateProductResponse> {
    debugger;
    this._store.setLoading(true);
    return this._service.createProduct(product).pipe(
      tap((response) => {
        this._store.addProduct(response.data);
        this._toastService.showToast(
          'Operación Exitosa',
          `Product "${product.name}" created successfully`, 
          'success'
        );
      }),
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


