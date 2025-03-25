import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { IDeleteProductResponse } from '../../../../shared/src/domain/model/IDeleteProductResponse';
import { ErrorHandlingService } from '../../infrastructure/services/error.handle.service';
import { ProductApiService } from '../../infrastructure/services/product.service';
import { ProductStoreService } from '../../infrastructure/services/product.store.service';
import { DeleteProductUseCase } from '../delete.product.use.case';


describe('DeleteProductUseCase', () => {
  let useCase: DeleteProductUseCase;
  let productApiServiceSpy: jasmine.SpyObj<ProductApiService>;
  let productStoreServiceSpy: jasmine.SpyObj<ProductStoreService>;
  let errorHandlingServiceSpy: jasmine.SpyObj<ErrorHandlingService>;

  beforeEach(() => {
    // Create spy objects for all dependencies
    const apiSpy = jasmine.createSpyObj('ProductApiService', ['deleteProduct']);
    const storeSpy = jasmine.createSpyObj('ProductStoreService', ['setLoading', 'deleteProduct']); 
    const errorSpy = jasmine.createSpyObj('ErrorHandlingService', ['handleError']);

    TestBed.configureTestingModule({
      providers: [
        DeleteProductUseCase,
        { provide: ProductApiService, useValue: apiSpy },
        { provide: ProductStoreService, useValue: storeSpy },
        { provide: ErrorHandlingService, useValue: errorSpy }
      ]
    });

    // Get the use case and spy objects
    useCase = TestBed.inject(DeleteProductUseCase);
    productApiServiceSpy = TestBed.inject(ProductApiService) as jasmine.SpyObj<ProductApiService>;
    productStoreServiceSpy = TestBed.inject(ProductStoreService) as jasmine.SpyObj<ProductStoreService>;
    errorHandlingServiceSpy = TestBed.inject(ErrorHandlingService) as jasmine.SpyObj<ErrorHandlingService>;
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should set loading to true and delete product from store before making API call', () => {
    // Arrange
    const productId = 'OPP-QQ';
    productApiServiceSpy.deleteProduct.and.returnValue(of({} as IDeleteProductResponse)); // Simula una respuesta vacía exitosa

    // Act
    useCase.execute(productId).subscribe();

    // Assert
    expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(true);
    expect(productStoreServiceSpy.deleteProduct).toHaveBeenCalledWith(productId);
    expect(productApiServiceSpy.deleteProduct).toHaveBeenCalledWith(productId);
  });

  it('should handle error when API call fails', () => {
    // Arrange
    const productId = 'OPP-QQ';
    const mockError = new HttpErrorResponse({
      error: 'API Error',
      status: 500,
      statusText: 'Internal Server Error'
    });
  
    const mockErrorMessage: any = { // Define mockErrorMessage
      code: 'SERVER_ERROR_500',
      message: 'Server error. Please try again later.',
      details: 'API Error',
      originalError: 'API Error',
    };
  
    productApiServiceSpy.deleteProduct.and.returnValue(throwError(() => mockError));
    errorHandlingServiceSpy.handleError.and.returnValue(throwError(() => mockErrorMessage)); // Simulate returning mockErrorMessage
  
    // Act
    useCase.execute(productId).subscribe({
      error: (error) => {
        // Assert
        expect(error).toEqual(mockErrorMessage); // Check against mockErrorMessage
      }
    });
  
    // Assert
    expect(errorHandlingServiceSpy.handleError).toHaveBeenCalledWith(
      mockError,
      `Product deletion failed: OPP-QQ`
    );
  });

  it('should set loading to false after API call completes (success case)', () => {
    // Arrange
    const productId = 'OPP-QQ';
    productApiServiceSpy.deleteProduct.and.returnValue(of({} as IDeleteProductResponse)); // Simula una respuesta vacía exitosa

    // Act
    useCase.execute(productId).subscribe();

    // Assert
    expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(false);
  });

  it('should set loading to false after API call completes (error case)', () => {
    // Arrange
    const productId = 'OPP-QQ';
    const mockError = new HttpErrorResponse({
      error: 'API Error',
      status: 500,
      statusText: 'Internal Server Error'
    });
    productApiServiceSpy.deleteProduct.and.returnValue(throwError(() => mockError));
    errorHandlingServiceSpy.handleError.and.returnValue(throwError(() => mockError));

    // Act
    useCase.execute(productId).subscribe({
      error: () => {
        // Ensure subscription completes
      }
    });

    // Assert
    expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(false);
  });
});