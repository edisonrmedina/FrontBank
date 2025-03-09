import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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
    debugger;
    return this.productApiService.createProduct(product);
  }
  
  
}


// debugger;
//     console.log('Ejecutando creación de producto...');
//     return this.productApiService.createProduct(product).pipe(
//       tap((response) => {
//         console.log('Producto creado exitosamente', response);
//         this.productStoreService.addProduct(response.data); 
//       }),
//       catchError((error) => {
//         console.error('Error en la creación del producto:', error);
//         return this.errorHandlingService.handleError(error, `Product creation failed: ${product.name}`);
//       }),
//       finalize(() => {
//         console.log('Proceso finalizado');
//         this.productStoreService.setLoading(false);
//       })
//     );