import { Injectable } from "@angular/core";
import { ITranslator } from "../../domain/ITransalator";

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentlanguage: string = 'es';
  private translator: ITranslator;

  public getLanguage(): string {
    return 'es';
  }

}