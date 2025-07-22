import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { IProduct } from '../../domain/model/IProduct';
import { ProductQuery } from '../../domain/state/product.query';
import { ErrorHandlingService } from '../../infrastructure/services/error.handle.service';
import { ProductStoreService } from '../../infrastructure/services/product.store.service';
import { GetSelectedProductCase } from '../getSelectedProductCase';


describe('GetSelectedProductCase', () => {
  let useCase: GetSelectedProductCase;
  let productQuerySpy: jasmine.SpyObj<ProductQuery>;
  let productStoreServiceSpy: jasmine.SpyObj<ProductStoreService>;
  let errorHandlingServiceSpy: jasmine.SpyObj<ErrorHandlingService>;

  beforeEach(() => {
    const querySpy = jasmine.createSpyObj('ProductQuery', ['selectSelectedProduct']);
    const storeSpy = jasmine.createSpyObj('ProductStoreService', ['setLoading']);
    const errorSpy = jasmine.createSpyObj('ErrorHandlingService', ['handleError']);

    TestBed.configureTestingModule({
      providers: [
        GetSelectedProductCase,
        { provide: ProductQuery, useValue: querySpy },
        { provide: ProductStoreService, useValue: storeSpy },
        { provide: ErrorHandlingService, useValue: errorSpy }
      ]
    });

    useCase = TestBed.inject(GetSelectedProductCase);
    productQuerySpy = TestBed.inject(ProductQuery) as jasmine.SpyObj<ProductQuery>;
    productStoreServiceSpy = TestBed.inject(ProductStoreService) as jasmine.SpyObj<ProductStoreService>;
    errorHandlingServiceSpy = TestBed.inject(ErrorHandlingService) as jasmine.SpyObj<ErrorHandlingService>;
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should set loading to true and return the selected product from the query', (done) => {
     
    const mockProduct: IProduct = { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1', date_release: '2024-01-01', date_revision: '2025-01-01' };
    productQuerySpy.selectSelectedProduct.and.returnValue(of(mockProduct));

     
    useCase.execute().subscribe(product => {
       
      expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(true);
      expect(productQuerySpy.selectSelectedProduct).toHaveBeenCalled();
      expect(product).toEqual(mockProduct);
      done();
    });
  });

  it('should handle error when the query fails and set loading to false', (done) => {
     
    const mockError = new HttpErrorResponse({ // Usa HttpErrorResponse
      error: 'Query Error',
      status: 500,
      statusText: 'Internal Server Error'
    });
    errorHandlingServiceSpy.handleError.and.returnValue(throwError(() => mockError));
    productQuerySpy.selectSelectedProduct.and.returnValue(throwError(() => mockError));

     
    useCase.execute().subscribe({
        next: () => {
          fail('Expected an error, but got a value');
          done();
        },
        error: (error) => {
          expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(true);
          expect(productQuerySpy.selectSelectedProduct).toHaveBeenCalled();
          expect(errorHandlingServiceSpy.handleError).toHaveBeenCalledWith(mockError, 'Error getting selected product');
          expect(error).toEqual(mockError); // Verifica que el error sea HttpErrorResponse
          done();
        },
        complete: () => {
          fail('Expected an error, but got complete');
          done();
        }
      });
    });

  
});