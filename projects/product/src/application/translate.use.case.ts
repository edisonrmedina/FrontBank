import { Injectable } from '@angular/core';
import { ErrorHandlingService, I18nTranslatorService, ProductStoreService, TranslationMapItem } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class LoadTranslationsUseCase  {
  constructor(
    private readonly _I18nTranslateService: I18nTranslatorService,
    private readonly _store: ProductStoreService,
    private readonly _errorHandler: ErrorHandlingService
  ) {}

  execute(language: string): void {
    this._store.setLoading(true);
    this._I18nTranslateService.loadTranslations(language).subscribe({
      next: (response: TranslationMapItem) => {
        this._store.setCurrentLanguage(language);
        this._store.setTranslations(response);
      },
      error: (error) => {
        this._errorHandler.handleError(error, 'Failed to load translations.');
        this._store.setLoading(false);
      },
      complete: () => {
        this._store.setLoading(false);
      },
    });
  }
}
