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
import { catchError, finalize, Observable, tap } from 'rxjs';
import { ErrorHandlingService, ICreateProductRequest, ICreateProductResponse, IUseCase, ProductStoreService, ToastService } from 'shared';
import { ProductApiService } from '../infrastructure/services/product.service';
@Injectable({
  providedIn: 'root'
})
export class CreateProductUseCase implements IUseCase<ICreateProductRequest, ICreateProductResponse> {
  constructor(private readonly _service: ProductApiService, private readonly _store: ProductStoreService, private readonly _errorHandler: ErrorHandlingService, private readonly _toastService: ToastService) {}
  execute(product: ICreateProductRequest): Observable<ICreateProductResponse> {
    if (stryMutAct_9fa48("0")) {
      {}
    } else {
      stryCov_9fa48("0");
      this._store.setLoading(stryMutAct_9fa48("1") ? false : (stryCov_9fa48("1"), true));
      return this._service.createProduct(product).pipe(tap(response => {
        if (stryMutAct_9fa48("2")) {
          {}
        } else {
          stryCov_9fa48("2");
          this._store.addProduct(response.data);
          this._toastService.showToast(stryMutAct_9fa48("3") ? "" : (stryCov_9fa48("3"), 'Operación Exitosa'), stryMutAct_9fa48("4") ? `` : (stryCov_9fa48("4"), `Product "${product.name}" created successfully`), stryMutAct_9fa48("5") ? "" : (stryCov_9fa48("5"), 'success'));
        }
      }), catchError(stryMutAct_9fa48("6") ? () => undefined : (stryCov_9fa48("6"), error => this._errorHandler.handleError(error, stryMutAct_9fa48("7") ? `` : (stryCov_9fa48("7"), `Product creation failed: ${product.name}`)))), finalize(stryMutAct_9fa48("8") ? () => undefined : (stryCov_9fa48("8"), () => this._store.setLoading(stryMutAct_9fa48("9") ? true : (stryCov_9fa48("9"), false)))));
    }
  }
}