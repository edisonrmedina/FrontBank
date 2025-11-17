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

describe('CreateProductUseCase (Jest)', () => {
  let useCase: CreateProductUseCase;

  let productApiServiceMock: jest.Mocked<ProductApiService>;
  let productStoreServiceMock: jest.Mocked<ProductStoreService>;
  let errorHandlingServiceMock: jest.Mocked<ErrorHandlingService>;
  let toastServiceMock: jest.Mocked<ToastService>;

  beforeEach(() => {
    productApiServiceMock = {
      createProduct: jest.fn(),
    } as any;

    productStoreServiceMock = {
      setLoading: jest.fn(),
      addProduct: jest.fn(),
    } as any;

    errorHandlingServiceMock = {
      handleError: jest.fn(),
    } as any;

    toastServiceMock = {
      showToast: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      providers: [
        CreateProductUseCase,
        { provide: ProductApiService, useValue: productApiServiceMock },
        { provide: ProductStoreService, useValue: productStoreServiceMock },
        { provide: ErrorHandlingService, useValue: errorHandlingServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    });

    useCase = TestBed.inject(CreateProductUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------------------------------
  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  // -----------------------------------------------------
  it('should set loading to true before API call', (done) => {
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

    productApiServiceMock.createProduct.mockReturnValue(of(mockResponse));

    useCase.execute(mockRequest).subscribe({
      next: () => {
        // Verificar que setLoading fue llamado con true
        const setLoadingCalls = productStoreServiceMock.setLoading.mock.calls;
        expect(setLoadingCalls[0][0]).toBe(true);
        expect(productApiServiceMock.createProduct).toHaveBeenCalledWith(
          mockRequest
        );
      },
      complete: () => {
        done();
      },
    });
  });

  // -----------------------------------------------------
  it('should add product to store on success', (done) => {
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

    productApiServiceMock.createProduct.mockReturnValue(of(mockResponse));

    useCase.execute(mockRequest).subscribe({
      next: () => {
        expect(productStoreServiceMock.addProduct).toHaveBeenCalledWith(
          mockResponse.data
        );
        expect(toastServiceMock.showToast).toHaveBeenCalled();
      },
      complete: () => {
        done();
      },
    });
  });

  // -----------------------------------------------------
  it('should handle error when API call fails', (done) => {
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

    productApiServiceMock.createProduct.mockReturnValue(
      throwError(() => mockError)
    );

    errorHandlingServiceMock.handleError.mockReturnValue(
      throwError(() => mockError)
    );

    useCase.execute(mockRequest).subscribe({
      error: (err) => {
        expect(err.status).toBe(500);
        expect(errorHandlingServiceMock.handleError).toHaveBeenCalledWith(
          mockError,
          `Product creation failed: ${mockRequest.name}`
        );
        done();
      },
    });
  });

  // -----------------------------------------------------
  it('should set loading to false after success', (done) => {
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

    productApiServiceMock.createProduct.mockReturnValue(of(mockResponse));

    useCase.execute(mockRequest).subscribe({
      complete: () => {
        // Verificar que setLoading fue llamado con false al final
        const setLoadingCalls = productStoreServiceMock.setLoading.mock.calls;
        const lastCall = setLoadingCalls[setLoadingCalls.length - 1];
        expect(lastCall[0]).toBe(false);
        done();
      },
    });
  });

  // -----------------------------------------------------
  it('should set loading to false after error', (done) => {
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

    productApiServiceMock.createProduct.mockReturnValue(
      throwError(() => mockError)
    );

    errorHandlingServiceMock.handleError.mockReturnValue(
      throwError(() => mockError)
    );

    useCase.execute(mockRequest).subscribe({
      error: () => {
        // Verificar que setLoading fue llamado con false después del error
        const setLoadingCalls = productStoreServiceMock.setLoading.mock.calls;
        const lastCall = setLoadingCalls[setLoadingCalls.length - 1];
        expect(lastCall[0]).toBe(false);
        done();
      },
    });
  });
});
