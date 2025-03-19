import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationRepository } from '../repositories/translation-repository';
import { TranslationMapItem } from '../ui/interfaces/TranslationMapItem';



@Injectable({
  providedIn: 'root',
})
export class I18nTranslatorService {
  constructor(private repository: TranslationRepository) {}

  loadTranslations(language?: string): Observable<TranslationMapItem> {
    const selectedLanguage = language || localStorage.getItem('language') || 'es';
    return this.repository.getTranslations(selectedLanguage);
  }
  
}