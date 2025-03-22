import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../domain/model/IProduct'; // Asegúrate de tener esta interfaz
import { IUseCase } from '../domain/model/IUseCase';
import { ErrorHandlingService } from '../infrastructure/services/error.handle.service';
import { ProductApiService } from '../infrastructure/services/product.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class GetAllProductsUseCase implements IUseCase<void, IProduct[]> {
  constructor(
    private readonly _service: ProductApiService,
    private readonly _store: ProductStoreService,
    private readonly _errorHandler: ErrorHandlingService,
  ) {}

  execute(): Observable<IProduct[]> {
    this._store.setLoading(true);
    debugger;
    return this._service.getAllProducts().pipe(
      map((response) => {
        console.log('Productos:', response);
        return response.data;
      }), // Extrae los datos
      tap(products => {
        this._store.setProducts(products);
      }),
      catchError((error) => {
        console.error('Error al obtener los productos:', error);
        this._errorHandler.handleError(error, 'Error fetching all products');
        return throwError(() => error); // Re-lanza el error
      }),
      finalize(() => {
        this._store.setLoading(false);
      })
    );
  }
}