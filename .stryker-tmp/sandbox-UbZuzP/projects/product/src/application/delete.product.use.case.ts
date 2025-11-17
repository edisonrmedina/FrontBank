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
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { ErrorHandlingService, IDeleteProductResponse, IUseCase, ProductStoreService, ToastService } from 'shared';
import { ProductApiService } from '../infrastructure/services/product.service';
@Injectable({
  providedIn: 'root'
})
export class DeleteProductUseCase implements IUseCase<string, IDeleteProductResponse> {
  constructor(private readonly _service: ProductApiService, private readonly _store: ProductStoreService, private readonly _errorHandler: ErrorHandlingService, private readonly _toastService: ToastService) {}
  execute(id: string): Observable<IDeleteProductResponse> {
    if (stryMutAct_9fa48("10")) {
      {}
    } else {
      stryCov_9fa48("10");
      this._store.setLoading(stryMutAct_9fa48("11") ? false : (stryCov_9fa48("11"), true));
      return this._service.deleteProduct(id).pipe(tap(() => {
        if (stryMutAct_9fa48("12")) {
          {}
        } else {
          stryCov_9fa48("12");
          this._store.deleteProduct(id);
          this._toastService.showToast(stryMutAct_9fa48("13") ? "" : (stryCov_9fa48("13"), 'Operación Exitosa'), stryMutAct_9fa48("14") ? `` : (stryCov_9fa48("14"), `Producto eliminado correctamente`), stryMutAct_9fa48("15") ? "" : (stryCov_9fa48("15"), 'success'));
        }
      }), catchError(error => {
        if (stryMutAct_9fa48("16")) {
          {}
        } else {
          stryCov_9fa48("16");
          this._errorHandler.handleError(error, stryMutAct_9fa48("17") ? `` : (stryCov_9fa48("17"), `Product deletion failed: ${id}`));
          return throwError(stryMutAct_9fa48("18") ? () => undefined : (stryCov_9fa48("18"), () => error));
        }
      }), finalize(stryMutAct_9fa48("19") ? () => undefined : (stryCov_9fa48("19"), () => this._store.setLoading(stryMutAct_9fa48("20") ? true : (stryCov_9fa48("20"), false)))));
    }
  }
}