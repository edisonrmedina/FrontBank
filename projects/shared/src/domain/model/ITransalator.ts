export interface ITranslator {
    translate(key: string, ...args : any[]):string;
}