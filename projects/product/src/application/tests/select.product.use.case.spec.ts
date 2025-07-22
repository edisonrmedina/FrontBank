import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { IProduct } from '../../domain/model/IProduct';
import { ErrorHandlingService } from '../../infrastructure/services/error.handle.service';
import { ProductApiService } from '../../infrastructure/services/product.service';
import { ProductStoreService } from '../../infrastructure/services/product.store.service';
import { SelectProductCase } from '../select-product-use-case';

describe('SelectProductCase', () => {
  let useCase: SelectProductCase;
  let productStoreServiceSpy: jasmine.SpyObj<ProductStoreService>;
  let errorHandlingServiceSpy: jasmine.SpyObj<ErrorHandlingService>;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('ProductStoreService', ['setLoading', 'setSelectedProduct']);
    const errorSpy = jasmine.createSpyObj('ErrorHandlingService', ['handleError']);

    TestBed.configureTestingModule({
      providers: [
        SelectProductCase,
        { provide: ProductStoreService, useValue: storeSpy },
        { provide: ErrorHandlingService, useValue: errorSpy },
        { provide: ProductApiService, useValue: {} } // Provide a value for ProductApiService (even if it's not used)
      ]
    });

    useCase = TestBed.inject(SelectProductCase);
    productStoreServiceSpy = TestBed.inject(ProductStoreService) as jasmine.SpyObj<ProductStoreService>;
    errorHandlingServiceSpy = TestBed.inject(ErrorHandlingService) as jasmine.SpyObj<ErrorHandlingService>;
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should set loading to true, set the selected product in the store, and set loading to false on success', (done) => {
     
    const mockProduct: IProduct = { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1', date_release: '2024-01-01', date_revision: '2025-01-01' };

    // Act
    useCase.execute(mockProduct).subscribe(result => {
       
      expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(true);
      expect(productStoreServiceSpy.setSelectedProduct).toHaveBeenCalledWith(mockProduct);
      expect(result).toBe(true);
      expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(false);
      done();
    });
  });

  it('should handle error and set loading to false', (done) => {
     
    const mockProduct: IProduct = { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1', date_release: '2024-01-01', date_revision: '2025-01-01' };
    const mockError = new HttpErrorResponse({
      error: 'Store Error',
      status: 500,
      statusText: 'Internal Server Error'
    });
    errorHandlingServiceSpy.handleError.and.returnValue(throwError(() => mockError));
    productStoreServiceSpy.setSelectedProduct.and.throwError(mockError); // Simulate error when setting selected product

    // Act
    useCase.execute(mockProduct).subscribe({
      next: () => {
        fail('Expected an error, but got a value');
        done();
      },
      error: (error) => {
        expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(true);
        expect(productStoreServiceSpy.setSelectedProduct).toHaveBeenCalledWith(mockProduct);
        expect(errorHandlingServiceSpy.handleError).toHaveBeenCalledWith(mockError, `Error selecting product with ID ${mockProduct.id}`);
        expect(error).toEqual(mockError);
        expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(false);
        done();
      },
      complete: () => {
        fail('Expected an error, but got complete');
        done();
      }
    });
  });
});