import { Injectable } from '@angular/core';
import { I18nTranslatorService, TranslationMapItem } from 'shared';
import { ErrorHandlingService } from '../infrastructure/services/error.handle.service';
import { ProductStoreService } from '../infrastructure/services/product.store.service';

@Injectable({
  providedIn: 'root',
})
export class LoadTranslationsUseCase {
  constructor(
    private readonly _I18nTranslateService: I18nTranslatorService,
    private readonly _store: ProductStoreService,
    private readonly _errorHandler: ErrorHandlingService,
  ) {}

  execute(): void {
    this._I18nTranslateService.loadTranslations().subscribe({
      next: (response: TranslationMapItem) => {
        this._store.setLoading(true);
        this._store.setTranslations(response);
      },
      error: (error) => {
        this._errorHandler.handleError(error, 'Failed to load translations.');
        this._store.setLoading(false);
      },
      complete: () => {
        this._store.setLoading(false);
      }
    });
  }
}
