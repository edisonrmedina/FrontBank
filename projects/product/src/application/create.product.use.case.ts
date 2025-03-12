import { inject, Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap } from 'rxjs';
import { ICreateProductRequest } from '../domain/model/ICreateProductRequest';
import { ICreateProductResponse } from '../domain/model/ICreateProductResponse';
import { ErrorHandlingService } from '../infrastructure/services/error.handle.service';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class CreateProductUseCase {
  private readonly productApiService = inject(ProductApiService);
  private readonly productStoreService = inject(ProductStoreService);
  private readonly errorHandlingService = inject(ErrorHandlingService);

  execute(product: ICreateProductRequest): Observable<ICreateProductResponse> {
    this.productStoreService.setLoading(true);
    return this.productApiService.createProduct(product).pipe(
      tap((response) => this.productStoreService.addProduct(response.data)),
      catchError((error) => this.errorHandlingService.handleError(error, `Product creation failed: ${product.name}`)),
      finalize(() => this.productStoreService.setLoading(false))
    );
  }
  
  
}
