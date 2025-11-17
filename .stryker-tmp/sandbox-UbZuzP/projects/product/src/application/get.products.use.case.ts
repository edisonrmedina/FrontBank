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
import { map } from 'rxjs/operators';
import { ErrorHandlingService, IProduct, IUseCase, ProductStoreService, ToastService } from 'shared';
import { ProductApiService } from '../infrastructure/services/product.service';
@Injectable({
  providedIn: 'root'
})
export class GetAllProductsUseCase implements IUseCase<void, IProduct[]> {
  constructor(private readonly _service: ProductApiService, private readonly _store: ProductStoreService, private readonly _errorHandler: ErrorHandlingService, private readonly _toastService: ToastService) {}
  execute(): Observable<IProduct[]> {
    if (stryMutAct_9fa48("21")) {
      {}
    } else {
      stryCov_9fa48("21");
      this._store.setLoading(stryMutAct_9fa48("22") ? false : (stryCov_9fa48("22"), true));
      return this._service.getAllProducts().pipe(map(response => {
        if (stryMutAct_9fa48("23")) {
          {}
        } else {
          stryCov_9fa48("23");
          if (stryMutAct_9fa48("26") ? response.data.length !== 0 : stryMutAct_9fa48("25") ? false : stryMutAct_9fa48("24") ? true : (stryCov_9fa48("24", "25", "26"), response.data.length === 0)) {
            if (stryMutAct_9fa48("27")) {
              {}
            } else {
              stryCov_9fa48("27");
              this._toastService.showToast(stryMutAct_9fa48("28") ? "" : (stryCov_9fa48("28"), 'Advertencia'), stryMutAct_9fa48("29") ? "" : (stryCov_9fa48("29"), 'No se encontraron productos'), stryMutAct_9fa48("30") ? "" : (stryCov_9fa48("30"), 'warning'));
            }
          }
          return response.data;
        }
      }),
      // Extrae los datos
      tap(products => {
        if (stryMutAct_9fa48("31")) {
          {}
        } else {
          stryCov_9fa48("31");
          this._store.setProducts(products);
        }
      }), catchError(error => {
        if (stryMutAct_9fa48("32")) {
          {}
        } else {
          stryCov_9fa48("32");
          console.error(stryMutAct_9fa48("33") ? "" : (stryCov_9fa48("33"), 'Error al obtener los productos:'), error);
          this._errorHandler.handleError(error, stryMutAct_9fa48("34") ? "" : (stryCov_9fa48("34"), 'Error fetching all products'));
          return throwError(stryMutAct_9fa48("35") ? () => undefined : (stryCov_9fa48("35"), () => error)); // Re-lanza el error
        }
      }), finalize(() => {
        if (stryMutAct_9fa48("36")) {
          {}
        } else {
          stryCov_9fa48("36");
          this._store.setLoading(stryMutAct_9fa48("37") ? true : (stryCov_9fa48("37"), false));
        }
      }));
    }
  }
}