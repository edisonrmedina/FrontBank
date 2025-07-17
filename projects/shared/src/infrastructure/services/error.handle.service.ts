import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IErrorMessage } from '../../domain/model/error.mesage';
import { errorMessages } from '../ui/interfaces/error-messages';
import { ProductStoreService } from './product.store.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(
    private productStoreService: ProductStoreService,
    private toastService: ToastService
  ) {}

  public handleError(
    error: HttpErrorResponse,
    operation: string
  ): Observable<never> {
    let errorMessage: IErrorMessage;

    if (error.error instanceof ProgressEvent) {
      errorMessage = this.handleProgressEventError(error, operation);
      this.showToastForError(errorMessage, 'error');
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = {
        code: 'CLIENT_ERROR',
        message: 'Error del cliente',
        details: `${operation}: ${error.error.message}`,
      };
      this.showToastForError(errorMessage, 'error');
    } else {
      errorMessage = this.mapServerError(error, operation);
      this.showToastForError(errorMessage, this.determineToastType(error.status));
    }

    // Caso de uso de manejo de estado
    this.productStoreService.setError(errorMessage.message);
    this.productStoreService.setLoading(false);

    // Registro de error en consola
    console.error(`${operation} failed:`, errorMessage);

    return throwError(() => errorMessage);
  }

  // Método privado para mostrar toast
  private showToastForError(errorMessage: IErrorMessage, type: 'success' | 'error' | 'warning') {
    this.toastService.showToast(
      this.getErrorTitle(type), 
      errorMessage.message, 
      type
    );
  }

  // Determinar el tipo de toast según el código de estado
  private determineToastType(statusCode: number): 'success' | 'error' | 'warning' {
    switch (true) {
      case statusCode >= 200 && statusCode < 300:
        return 'success';
      case statusCode >= 400 && statusCode < 500:
        return 'warning';
      case statusCode >= 500:
        return 'error';
      default:
        return 'error';
    }
  }

  // Obtener título del error según el tipo
  private getErrorTitle(type: 'success' | 'error' | 'warning'): string {
    const titles = {
      'success': 'Operación Exitosa',
      'error': 'Error del Sistema',
      'warning': 'Advertencia'
    };
    return titles[type];
  }

  private mapServerError(
    error: HttpErrorResponse,
    operation: string
  ): IErrorMessage {
    const statusCode = error.status;
    const errorBody = error.error;

    let message = this.getErrorMessageByCode(statusCode, errorBody);

    return {
      code: `SERVER_ERROR_${statusCode}`,
      message,
      details: errorBody?.message || error.message,
      originalError: errorBody,
    };
  }

  private getErrorMessageByCode(statusCode: number, errorBody: any): string {
    if (errorBody?.name) {
      return errorMessages[errorBody.name] || errorMessages['default'];
    }
    return errorMessages[statusCode] || errorMessages['default'];
  }

  private handleProgressEventError(
    error: HttpErrorResponse,
    operation: string
  ): IErrorMessage {
    let message =
      'Error de red o solicitud fallida. Por favor, revise su conexión a internet o la configuración de CORS.';

    return {
      code: 'NETWORK_ERROR',
      message,
      details: `${operation}: Error de red encontrado.`,
      originalError: error,
    };
  }

  public clearError(): void {
    this.productStoreService.setError('');
  }
}