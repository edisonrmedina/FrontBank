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
import { ErrorHandlingService, I18nTranslatorService, ProductStoreService, TranslationMapItem } from 'shared';
@Injectable({
  providedIn: 'root'
})
export class LoadTranslationsUseCase {
  constructor(private readonly _I18nTranslateService: I18nTranslatorService, private readonly _store: ProductStoreService, private readonly _errorHandler: ErrorHandlingService) {}
  execute(language: string): void {
    if (stryMutAct_9fa48("60")) {
      {}
    } else {
      stryCov_9fa48("60");
      this._store.setLoading(stryMutAct_9fa48("61") ? false : (stryCov_9fa48("61"), true));
      this._I18nTranslateService.loadTranslations(language).subscribe(stryMutAct_9fa48("62") ? {} : (stryCov_9fa48("62"), {
        next: (response: TranslationMapItem) => {
          if (stryMutAct_9fa48("63")) {
            {}
          } else {
            stryCov_9fa48("63");
            this._store.setCurrentLanguage(language);
            this._store.setTranslations(response);
          }
        },
        error: error => {
          if (stryMutAct_9fa48("64")) {
            {}
          } else {
            stryCov_9fa48("64");
            this._errorHandler.handleError(error, stryMutAct_9fa48("65") ? "" : (stryCov_9fa48("65"), 'Failed to load translations.'));
            this._store.setLoading(stryMutAct_9fa48("66") ? true : (stryCov_9fa48("66"), false));
          }
        },
        complete: () => {
          if (stryMutAct_9fa48("67")) {
            {}
          } else {
            stryCov_9fa48("67");
            this._store.setLoading(stryMutAct_9fa48("68") ? true : (stryCov_9fa48("68"), false));
          }
        }
      }));
    }
  }
}