import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationStrategy } from '../strategies/translation';
import { en } from '../ui/i18n/en';
import { es } from '../ui/i18n/es';
import { TranslationMapItem } from '../ui/interfaces/TranslationMapItem';
import { TranslationMap } from '../ui/interfaces/translationsMap';



@Injectable({
  providedIn: 'root',
})
export class I18nTranslatorService {
  constructor(private translationStrategy: TranslationStrategy ) {}

  loadTranslations(language?: string): Observable<TranslationMapItem> {
    debugger;
    const selectedLanguage =
      language || localStorage.getItem('language') || 'es';
    return this.translationStrategy.getTranslations(selectedLanguage);
  }
}