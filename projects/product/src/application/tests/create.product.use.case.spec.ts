import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import {
  ICreateProductRequest,
  ICreateProductResponse,
  ProductStoreService,
  ErrorHandlingService,
  ToastService,
} from 'shared';

import { ProductApiService } from '../../infrastructure/services/product.service';
import { CreateProductUseCase } from '../create.product.use.case';

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let productApiServiceSpy: jasmine.SpyObj<ProductApiService>;
  let productStoreServiceSpy: jasmine.SpyObj<ProductStoreService>;
  let errorHandlingServiceSpy: jasmine.SpyObj<ErrorHandlingService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  beforeEach(() => {
    // Crear spies de Jasmine
    productApiServiceSpy = jasmine.createSpyObj('ProductApiService', [
      'createProduct',
    ]);
    productStoreServiceSpy = jasmine.createSpyObj('ProductStoreService', [
      'setLoading',
      'addProduct',
    ]);
    errorHandlingServiceSpy = jasmine.createSpyObj('ErrorHandlingService', [
      'handleError',
    ]);
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['showToast']);

    TestBed.configureTestingModule({
      providers: [
        CreateProductUseCase,
        { provide: ProductApiService, useValue: productApiServiceSpy },
        { provide: ProductStoreService, useValue: productStoreServiceSpy },
        { provide: ErrorHandlingService, useValue: errorHandlingServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
      ],
    });

    useCase = TestBed.inject(CreateProductUseCase);
  });

  // -----------------------------------------------------
  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  // -----------------------------------------------------
  it('should set loading to true before API call', (done: DoneFn) => {
    const mockRequest: ICreateProductRequest = {
      id: 'OPP-QQ',
      name: 'Test Product',
      description: 'Test',
      logo: 'logo.png',
      date_release: '2025-03-12',
      date_revision: '2026-03-12',
    };

    const mockResponse: ICreateProductResponse = {
      data: mockRequest,
      message: 'OK',
    };

    productApiServiceSpy.createProduct.and.returnValue(of(mockResponse));

    useCase.execute(mockRequest).subscribe({
      next: () => {
        // Verificar que setLoading fue llamado con true
        expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(true);
        expect(productApiServiceSpy.createProduct).toHaveBeenCalledWith(
          mockRequest
        );
      },
      complete: () => {
        done();
      },
    });
  });

  // -----------------------------------------------------
  it('should add product to store on success', (done: DoneFn) => {
    const mockRequest: ICreateProductRequest = {
      id: 'OPP-QQ2',
      name: 'Test Product',
      description: 'desc',
      logo: 'logo.png',
      date_release: '2025-03-12',
      date_revision: '2026-03-12',
    };

    const mockResponse: ICreateProductResponse = {
      data: mockRequest,
      message: 'OK',
    };

    productApiServiceSpy.createProduct.and.returnValue(of(mockResponse));

    useCase.execute(mockRequest).subscribe({
      next: () => {
        expect(productStoreServiceSpy.addProduct).toHaveBeenCalledWith(
          mockResponse.data
        );
        expect(toastServiceSpy.showToast).toHaveBeenCalled();
      },
      complete: () => {
        done();
      },
    });
  });

  // -----------------------------------------------------
  it('should handle error when API call fails', (done: DoneFn) => {
    const mockRequest: ICreateProductRequest = {
      id: 'OPP-ERR',
      name: 'Test Error',
      description: '',
      logo: '',
      date_release: '2025-03-12',
      date_revision: '2026-03-12',
    };

    const mockError = new HttpErrorResponse({
      error: 'API Error',
      status: 500,
      statusText: 'Internal Server Error',
    });

    productApiServiceSpy.createProduct.and.returnValue(
      throwError(() => mockError)
    );
    errorHandlingServiceSpy.handleError.and.returnValue(
      throwError(() => mockError)
    );

    useCase.execute(mockRequest).subscribe({
      error: (err) => {
        expect(err.status).toBe(500);
        expect(errorHandlingServiceSpy.handleError).toHaveBeenCalledWith(
          mockError,
          `Product creation failed: ${mockRequest.name}`
        );
        done();
      },
    });
  });

  // -----------------------------------------------------
  it('should set loading to false after success', (done: DoneFn) => {
    const mockRequest: ICreateProductRequest = {
      id: 'OPP-SUCCESS',
      name: 'Success',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };

    const mockResponse: ICreateProductResponse = {
      data: mockRequest,
      message: 'OK',
    };

    productApiServiceSpy.createProduct.and.returnValue(of(mockResponse));

    useCase.execute(mockRequest).subscribe({
      complete: () => {
        // Verificar que setLoading fue llamado con false al final
        const calls = productStoreServiceSpy.setLoading.calls.all();
        const lastCall = calls[calls.length - 1];
        expect(lastCall.args[0]).toBe(false);
        done();
      },
    });
  });

  // -----------------------------------------------------
  it('should set loading to false after error', (done: DoneFn) => {
    const mockRequest: ICreateProductRequest = {
      id: 'OPP-ERROR2',
      name: 'Test',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };

    const mockError = new HttpErrorResponse({
      error: 'API Error',
      status: 500,
      statusText: 'Internal Server Error',
    });

    productApiServiceSpy.createProduct.and.returnValue(
      throwError(() => mockError)
    );
    errorHandlingServiceSpy.handleError.and.returnValue(
      throwError(() => mockError)
    );

    useCase.execute(mockRequest).subscribe({
      error: () => {
        // Verificar que setLoading fue llamado con false después del error
        const calls = productStoreServiceSpy.setLoading.calls.all();
        const lastCall = calls[calls.length - 1];
        expect(lastCall.args[0]).toBe(false);
        done();
      },
    });
  });
});
