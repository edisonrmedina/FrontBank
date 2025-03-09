export interface IErrorMessage {
    code: string;
    message: string;
    details?: string;
    originalError?: any;
    errors?: {
      target?: Record<string, any>;
      property: string;
      constraints?: Record<string, string>;
    }[];
  }