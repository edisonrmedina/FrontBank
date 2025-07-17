// shared/strategies/local-translation.strategy.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { es } from '../../ui/i18n/en';
import { en } from '../../ui/i18n/es';
import { TranslationMapItem } from '../../ui/interfaces/TranslationMapItem';
import { TranslationMap } from '../../ui/interfaces/translationsMap';
import { ITranslationsStrategy } from './translation-strategy';
@Injectable({
  providedIn: 'root'
})
export class LocalTranslationStrategy implements ITranslationsStrategy  {
  private translationsMap: TranslationMap = { en, es };

  getTranslations(language: string): Observable<TranslationMapItem> {
    const normalizedLanguage = language.split('-')[0];
    return of(this.translationsMap[normalizedLanguage] || this.translationsMap['es']);
  } 
}
