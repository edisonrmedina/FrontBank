// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ErrorHandlingService, IUpdateProductInput, IUpdateProductResponse, IUseCase, ProductStoreService, ToastService } from 'shared';
import { ProductApiService } from '../infrastructure/services/product.service';
@Injectable({
  providedIn: 'root'
})
export class UpdateProductUseCase implements IUseCase<IUpdateProductInput, IUpdateProductResponse> {
  constructor(private readonly _service: ProductApiService, private readonly _store: ProductStoreService, private readonly _errorHandler: ErrorHandlingService, private readonly _toastService: ToastService) {}
  execute(input: IUpdateProductInput): Observable<IUpdateProductResponse> {
    if (stryMutAct_9fa48("69")) {
      {}
    } else {
      stryCov_9fa48("69");
      this._store.setLoading(stryMutAct_9fa48("70") ? false : (stryCov_9fa48("70"), true));
      return this._service.updateProduct(input.id, input.product).pipe(tap(response => {
        if (stryMutAct_9fa48("71")) {
          {}
        } else {
          stryCov_9fa48("71");
          this._store.updateProduct(input.id, response.data);
          this._toastService.showToast(stryMutAct_9fa48("72") ? "" : (stryCov_9fa48("72"), 'Operación Exitosa'), stryMutAct_9fa48("73") ? `` : (stryCov_9fa48("73"), `Producto "${input.product.name}" actualizado correctamente`), stryMutAct_9fa48("74") ? "" : (stryCov_9fa48("74"), 'success'));
        }
      }), catchError(error => {
        if (stryMutAct_9fa48("75")) {
          {}
        } else {
          stryCov_9fa48("75");
          console.error(stryMutAct_9fa48("76") ? `` : (stryCov_9fa48("76"), `Error updating product with ID ${input.id}:`), error);
          this._errorHandler.handleError(error, stryMutAct_9fa48("77") ? `` : (stryCov_9fa48("77"), `Error updating product with ID ${input.id}`));
          return throwError(stryMutAct_9fa48("78") ? () => undefined : (stryCov_9fa48("78"), () => error));
        }
      }), finalize(() => {
        if (stryMutAct_9fa48("79")) {
          {}
        } else {
          stryCov_9fa48("79");
          this._store.setLoading(stryMutAct_9fa48("80") ? true : (stryCov_9fa48("80"), false));
        }
      }));
    }
  }
}