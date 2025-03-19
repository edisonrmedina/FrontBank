import { Component, Inject } from '@angular/core';
import { LANGUAGE } from '../../../../app.config';
import { I18nTranslatorService } from '../../../services/I18nTranslator.service';
import { LocalTranslationStrategy } from '../../../strategies/i18n-strategy/local-translation-strategy';
import { TranslationStrategy } from '../../../strategies/translation';

@Component({
  selector: 'lib-rootshared',
  standalone: true,
  imports: [],
  templateUrl: './rootshared.component.html',
  styleUrl: './rootshared.component.css',
  providers: [
    {
      provide: LANGUAGE,
      useFactory: () => {
        return localStorage.getItem('language') || navigator.language || 'es';
      },
    },
    {
      provide : TranslationStrategy , useClass: LocalTranslationStrategy
    }
  ],
})

export class RootsharedComponent {
  constructor(
    private readonly _i18nTranslatorService: I18nTranslatorService,
    @Inject(LANGUAGE) private language: string
  ) {
    this._i18nTranslatorService.loadTranslations(this.language);
  }
}
