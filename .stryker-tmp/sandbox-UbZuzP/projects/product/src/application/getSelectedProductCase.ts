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
import { catchError, finalize } from 'rxjs/operators';
import { ErrorHandlingService, IProduct, IUseCase, ProductQuery, ProductStoreService } from 'shared';
@Injectable({
  providedIn: 'root'
})
export class GetSelectedProductCase implements IUseCase<void, IProduct | null> {
  constructor(private readonly _query: ProductQuery, private readonly _store: ProductStoreService, private readonly _errorHandler: ErrorHandlingService) {}
  execute(): Observable<IProduct | null> {
    if (stryMutAct_9fa48("38")) {
      {}
    } else {
      stryCov_9fa48("38");
      return this._query.selectSelectedProduct().pipe(catchError(err => {
        if (stryMutAct_9fa48("39")) {
          {}
        } else {
          stryCov_9fa48("39");
          console.error(stryMutAct_9fa48("40") ? "" : (stryCov_9fa48("40"), 'Error getting selected product:'), err);
          this._errorHandler.handleError(err, stryMutAct_9fa48("41") ? "" : (stryCov_9fa48("41"), 'Error getting selected product'));
          return throwError(stryMutAct_9fa48("42") ? () => undefined : (stryCov_9fa48("42"), () => err));
        }
      }), finalize(() => {
        if (stryMutAct_9fa48("43")) {
          {}
        } else {
          stryCov_9fa48("43");
          this._store.setLoading(stryMutAct_9fa48("44") ? true : (stryCov_9fa48("44"), false));
        }
      }));
    }
  }
}