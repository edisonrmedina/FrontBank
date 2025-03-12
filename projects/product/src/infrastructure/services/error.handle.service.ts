import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IErrorMessage } from '../../domain/model/error.mesage';
import { ProductStoreService } from './product.store.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(private productStoreService: ProductStoreService) {}

  public handleError(
    error: HttpErrorResponse,
    operation: string
  ): Observable<never> {
    let errorMessage: IErrorMessage;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = {
        code: 'CLIENT_ERROR',
        message: 'Client error',
        details: `${operation}: ${error.error.message}`,
      };
    } else {
      // Server-side error
      errorMessage = this.mapServerError(error, operation);
    }

    this.productStoreService.setError(errorMessage.message);
    this.productStoreService.setLoading(false);

    console.error(`${operation} failed:`, errorMessage);

    return throwError(() => errorMessage);
  }

  private mapServerError(
    error: HttpErrorResponse,
    operation: string
  ): IErrorMessage {
    const statusCode = error.status;
    let message: string;
    const errorBody = error.error;

    // Handle specific error types from backend
    if (errorBody && errorBody.name) {
      switch (errorBody.name) {
        case 'NotFoundError':
          message = 'The product was not found.';
          return {
            code: 'NOT_FOUND',
            message,
            details: errorBody.message || 'Resource not found',
            originalError: errorBody,
          };

        case 'ValidationError':
          message = 'Validation error. Please check the entered data.';
          return {
            code: 'VALIDATION_ERROR',
            message,
            details: errorBody.message || 'Invalid data',
            originalError: errorBody,
          };

        case 'DuplicateError':
          message = 'This product already exists in the system.';
          return {
            code: 'DUPLICATE_ERROR',
            message,
            details: errorBody.message || 'Duplicate resource',
            originalError: errorBody,
          };
      }
    }

    // Handle standard HTTP status codes
    switch (statusCode) {
      case 400:
        message = 'Bad request. Please check the data.';
        break;
      case 401:
        message = 'Unauthorized. Please log in again.';
        break;
      case 403:
        message = 'Access denied. You do not have permission for this action.';
        break;
      case 404:
        message = 'Resource not found.';
        break;
      case 409:
        message = 'Conflict with the current state of the resource.';
        break;
      case 500:
        message = 'Server error. Please try again later.';
        break;
      default:
        message = 'Unknown error. Please try again later.';
    }

    return {
      code: `SERVER_ERROR_${statusCode}`,
      message,
      details: errorBody?.message || error.message,
      originalError: errorBody,
    };
  }

  /**
   * Clear any error state
   */
  public clearError(): void {
    this.productStoreService.setError('');
  }
}
