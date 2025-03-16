import { Inject, Injectable } from '@angular/core';
import { ITranslator } from '../../domain/ITransalator';
import { LANGUAGE } from './../../app.config';

@Injectable({
  providedIn: 'root',
})
export class I18nTranslatorService implements ITranslator {
  private translations: { [key: string]: string } = {};

  constructor(@Inject(LANGUAGE) private language: string) {
    console.log("lana:", this.language);
    
    this.loadTransalations();
  }

  loadTransalations(): void {
    console.log("carga de json");
    
    //this.translations = require(`../../../../assets/i18n/${this.language}.json`);
  }

  translate(key: string, ...args: any[]): string {
    throw new Error('Method not implemented.');
  }
}
