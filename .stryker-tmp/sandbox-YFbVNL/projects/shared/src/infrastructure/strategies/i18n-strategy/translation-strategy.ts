// @ts-nocheck
import { Observable } from 'rxjs';
import { TranslationMapItem } from '../../../domain/model/TranslationMapItem';

export interface ITranslationsStrategy {
  getTranslations(language: string): Observable<TranslationMapItem>;
}
