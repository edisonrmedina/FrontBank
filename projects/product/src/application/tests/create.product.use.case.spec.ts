import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ICreateProductRequest } from '../../domain/model/ICreateProductRequest';
import { ICreateProductResponse } from '../../domain/model/ICreateProductResponse';
import { ErrorHandlingService } from '../../infrastructure/services/error.handle.service';
import { ProductApiService } from '../../infrastructure/services/product.service';
import { ProductStoreService } from '../../infrastructure/services/product.store.service';
import { CreateProductUseCase } from '../create.product.use.case';


describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let productApiServiceSpy: jasmine.SpyObj<ProductApiService>;
  let productStoreServiceSpy: jasmine.SpyObj<ProductStoreService>;
  let errorHandlingServiceSpy: jasmine.SpyObj<ErrorHandlingService>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ProductApiService', ['createProduct']);
    const storeSpy = jasmine.createSpyObj('ProductStoreService', ['setLoading', 'addProduct']);
    const errorSpy = jasmine.createSpyObj('ErrorHandlingService', ['handleError']);

    TestBed.configureTestingModule({
      providers: [
        CreateProductUseCase,
        { provide: ProductApiService, useValue: apiSpy },
        { provide: ProductStoreService, useValue: storeSpy },
        { provide: ErrorHandlingService, useValue: errorSpy }
      ]
    });

    useCase = TestBed.inject(CreateProductUseCase);
    productApiServiceSpy = TestBed.inject(ProductApiService) as jasmine.SpyObj<ProductApiService>;
    productStoreServiceSpy = TestBed.inject(ProductStoreService) as jasmine.SpyObj<ProductStoreService>;
    errorHandlingServiceSpy = TestBed.inject(ErrorHandlingService) as jasmine.SpyObj<ErrorHandlingService>;
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should set loading to true before making API call', () => {
     
    const mockRequest: ICreateProductRequest = {
      id: 'OPP-QQ',
      name: 'Test Product',
      description: 'Test description',
      logo: 'https://test-logo.png',
      date_release: '2025-03-12',
      date_revision: '2026-03-12',
    };
    const mockResponse: ICreateProductResponse = { 
      data: {
        id: 'OPP-QQ',
        name: 'Test Product',
        description: 'Test description',
        logo: 'https://test-logo.png',
        date_release: '2025-03-12',
        date_revision: '2026-03-12'
      },
      message: 'Product created successfully'
    };
    productApiServiceSpy.createProduct.and.returnValue(of(mockResponse));
  
     
    useCase.execute(mockRequest).subscribe();
  
     
    expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(true);
    expect(productApiServiceSpy.createProduct).toHaveBeenCalledWith(mockRequest);

  });

  it('should add product to store when API call succeeds', () => {
     
    const mockRequest: ICreateProductRequest = {
      id: 'OPP-QQ2',
      name: 'Test Product',
      description: 'Test description',
      logo: 'https://test-logo.png',
      date_release: '2025-03-12',
      date_revision: '2026-03-12',
    };
    const mockResponse: ICreateProductResponse = { 
      data: {
        id: 'OPP-QQ2',
        name: 'Test Product',
        description: 'Test description',
        logo: 'https://test-logo.png',
        date_release: '2025-03-12',
        date_revision: '2026-03-12'
      },
      message: 'Product created successfully'
    };
    productApiServiceSpy.createProduct.and.returnValue(of(mockResponse));

    useCase.execute(mockRequest).subscribe();

    expect(productStoreServiceSpy.addProduct).toHaveBeenCalledWith(mockResponse.data);
  });

  it('should handle error when API call fails', () => {
    
    const mockRequest: ICreateProductRequest = {
      id: 'OPP-QQ2',
      name: 'Test Product',
      description: 'Test description',
      logo: 'https://test-logo.png',
      date_release: '2025-03-12',
      date_revision: '2026-03-12',
    };
        
    
    const mockError = new HttpErrorResponse({
      error: 'API Error',
      status: 500,
      statusText: 'Internal Server Error'
    });
        
    productApiServiceSpy.createProduct.and.returnValue(throwError(() => mockError));
    errorHandlingServiceSpy.handleError.and.returnValue(throwError(() => mockError));
      
     
    useCase.execute(mockRequest).subscribe({
      error: (error) => {
         
        expect(error).toBe(mockError);
      }
    });
      
     
    expect(errorHandlingServiceSpy.handleError).toHaveBeenCalledWith(
      mockError,
      `Product creation failed: ${mockRequest.name}`
    );
  });

  it('should set loading to false after API call completes (success case)', () => {
     
    const mockRequest: ICreateProductRequest = {
      id: 'OPP-QQ3',
      name: 'Test Product',
      description: 'Test description',
      logo: 'https://test-logo.png',
      date_release: '2025-03-12',
      date_revision: '2026-03-12',
    };
    const mockResponse: ICreateProductResponse = { 
      data: {
        id: 'OPP-QQ3',
        name: 'Test Product',
        description: 'Test description',
        logo: 'https://test-logo.png',
        date_release: '2025-03-12',
        date_revision: '2026-03-12'
      },
      message: 'Product created successfully'
    };
    productApiServiceSpy.createProduct.and.returnValue(of(mockResponse));

     
    useCase.execute(mockRequest).subscribe();

     
    expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(false);
  });

  it('should set loading to false after API call completes (error case)', () => {
     
    const mockRequest: ICreateProductRequest = {
      id: 'OPP-QQ3',
      name: 'Test Product',
      description: 'Test description',
      logo: 'https://test-logo.png',
      date_release: '2025-03-12',
      date_revision: '2026-03-12',
    };
    
    const mockError = new HttpErrorResponse({
      error: 'API Error',
      status: 500,
      statusText: 'Internal Server Error'
    });
    
    productApiServiceSpy.createProduct.and.returnValue(throwError(() => mockError));
    errorHandlingServiceSpy.handleError.and.returnValue(throwError(() => mockError));
  
     
    useCase.execute(mockRequest).subscribe({
      error: () => {
        
      }
    });
  
     
    expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(false);
  });
});