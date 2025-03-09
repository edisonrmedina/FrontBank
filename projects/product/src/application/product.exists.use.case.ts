import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductExistsResponse } from '../domain/model/IProductExistsResponse';
import { ProductApiService } from '../infrastructure/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductExistsUseCase {
  private readonly _service = inject(ProductApiService);

  execute(id: string): Observable<IProductExistsResponse> {
    return this._service.productExists(id);
  }
  
}
