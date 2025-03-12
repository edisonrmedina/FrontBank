import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { IProductExistsResponse } from '../../domain/model/IProductExistsResponse';
import { ErrorHandlingService } from '../../infrastructure/services/error.handle.service';
import { ProductApiService } from '../../infrastructure/services/product.service';
import { ProductStoreService } from '../../infrastructure/services/product.store.service';
import { ProductExistsUseCase } from '../product.exists.use.case';


describe('ProductExistsUseCase', () => {
  let useCase: ProductExistsUseCase;
  let productApiServiceSpy: jasmine.SpyObj<ProductApiService>;
  let productStoreServiceSpy: jasmine.SpyObj<ProductStoreService>;
  let errorHandlingServiceSpy: jasmine.SpyObj<ErrorHandlingService>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ProductApiService', ['productExists']);
    const storeSpy = jasmine.createSpyObj('ProductStoreService', ['setLoading']);
    const errorSpy = jasmine.createSpyObj('ErrorHandlingService', ['handleError']);

    TestBed.configureTestingModule({
      providers: [
        ProductExistsUseCase,
        { provide: ProductApiService, useValue: apiSpy },
        { provide: ProductStoreService, useValue: storeSpy },
        { provide: ErrorHandlingService, useValue: errorSpy }
      ]
    });

    useCase = TestBed.inject(ProductExistsUseCase);
    productApiServiceSpy = TestBed.inject(ProductApiService) as jasmine.SpyObj<ProductApiService>;
    productStoreServiceSpy = TestBed.inject(ProductStoreService) as jasmine.SpyObj<ProductStoreService>;
    errorHandlingServiceSpy = TestBed.inject(ErrorHandlingService) as jasmine.SpyObj<ErrorHandlingService>;
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should set loading to true and return true when product exists', (done) => {
    // Arrange
    const productId = 'OPP-QQ';
    const mockResponse: IProductExistsResponse = { exists: true };
    productApiServiceSpy.productExists.and.returnValue(of(mockResponse));

    // Act
    useCase.execute(productId).subscribe(response => {
      // Assert
      expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(true);
      expect(productApiServiceSpy.productExists).toHaveBeenCalledWith(productId);
      expect(response).toEqual(mockResponse);
      done();
    });
  });

  it('should set loading to true and return false when product does not exist', (done) => {
    // Arrange
    const productId = 'OPP-QQ';
    const mockResponse: IProductExistsResponse = { exists: false };
    productApiServiceSpy.productExists.and.returnValue(of(mockResponse));

    // Act
    useCase.execute(productId).subscribe(response => {
      // Assert
      expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(true);
      expect(productApiServiceSpy.productExists).toHaveBeenCalledWith(productId);
      expect(response).toEqual(mockResponse);
      done();
    });
  });

  it('should handle error when API call fails and set loading to false', (done) => {
    // Arrange
    const productId = 'OPP-QQ';
    const mockError = new HttpErrorResponse({
      error: 'API Error',
      status: 500,
      statusText: 'Internal Server Error'
    });
    productApiServiceSpy.productExists.and.returnValue(throwError(() => mockError));
    errorHandlingServiceSpy.handleError.and.returnValue(throwError(() => mockError));

    // Act
    useCase.execute(productId).subscribe({
      next: () => {
        fail('Expected an error, but got a value');
        done();
      },
      error: (error) => {
        expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(true);
        expect(productApiServiceSpy.productExists).toHaveBeenCalledWith(productId);
        expect(errorHandlingServiceSpy.handleError).toHaveBeenCalledWith(mockError, `Error checking if product with ID ${productId} exists`);
        expect(error).toEqual(mockError);
        done();
      },
      complete: () => {
        fail('Expected an error, but got complete');
        done();
      }
    });
  });
});