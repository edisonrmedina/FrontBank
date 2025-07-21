import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ErrorHandlingService, IProduct, IUseCase, ProductQuery, ProductStoreService } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class GetSelectedProductCase implements IUseCase<void, IProduct | null> {
  constructor(
    private readonly _query: ProductQuery,
    private readonly _store: ProductStoreService,
    private readonly _errorHandler: ErrorHandlingService
  ) {}

  execute(): Observable<IProduct | null> {
    //this._store.setLoading(true);
    return this._query.selectSelectedProduct().pipe(
      catchError((err) => {
        console.error("Error getting selected product:", err);
        this._errorHandler.handleError(err, "Error getting selected product");
        return throwError(() => err);
      }),
      finalize(() => {
        this._store.setLoading(false);
      })
    );
  }
}