// @ts-nocheck
// shared/repositories/translation.repository.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationStrategy } from '../strategies/translation';
import { TranslationMapItem } from '../../domain/model/TranslationMapItem';

@Injectable({
  providedIn: 'root',
})
export class TranslationRepository {
  constructor(private strategy: TranslationStrategy) {}

  getTranslations(language: string): Observable<TranslationMapItem> {
    return this.strategy.getTranslations(language);
  }
}
