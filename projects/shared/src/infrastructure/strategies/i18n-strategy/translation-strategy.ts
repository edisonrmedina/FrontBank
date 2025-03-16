import { Observable } from 'rxjs';
import { TranslationMapItem } from '../../ui/interfaces/TranslationMapItem';

export interface ITranslationsStrategy   {
  getTranslations(language: string): Observable<TranslationMapItem>;
}
