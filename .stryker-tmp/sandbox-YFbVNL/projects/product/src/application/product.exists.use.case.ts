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
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ErrorHandlingService, IUseCase, ProductStoreService } from 'shared';
import { ProductApiService } from '../infrastructure/services/product.service';
@Injectable({
  providedIn: 'root'
})
export class ProductExistsUseCase implements IUseCase<string, boolean> {
  constructor(private readonly _service: ProductApiService, private readonly _store: ProductStoreService, private readonly _errorHandler: ErrorHandlingService) {}
  execute(id: string): Observable<boolean> {
    if (stryMutAct_9fa48("45")) {
      {}
    } else {
      stryCov_9fa48("45");
      this._store.setLoading(stryMutAct_9fa48("46") ? false : (stryCov_9fa48("46"), true));
      return this._service.productExists(id).pipe(catchError(error => {
        if (stryMutAct_9fa48("47")) {
          {}
        } else {
          stryCov_9fa48("47");
          return this._errorHandler.handleError(error, stryMutAct_9fa48("48") ? `` : (stryCov_9fa48("48"), `Error checking if product with ID ${id} exists`));
        }
      }), finalize(() => {
        if (stryMutAct_9fa48("49")) {
          {}
        } else {
          stryCov_9fa48("49");
          this._store.setLoading(stryMutAct_9fa48("50") ? true : (stryCov_9fa48("50"), false));
        }
      }));
    }
  }
}