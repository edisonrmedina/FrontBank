import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationMapItem } from '../../ui/interfaces/TranslationMapItem';
import { ITranslationsStrategy } from './translation-strategy';

@Injectable({
  providedIn: 'root',
})
export class RemoteTranslationStrategy implements ITranslationsStrategy {
  constructor(private http: HttpClient) {}

  getTranslations(language: string): Observable<TranslationMapItem> {
    return this.http.get<TranslationMapItem>(`/api/translations/${language}`);
  }
}
