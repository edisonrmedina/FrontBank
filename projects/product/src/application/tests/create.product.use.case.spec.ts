import { vi, describe, beforeEach, it, expect } from 'vitest';
import { of, throwError } from 'rxjs';

import {
  ProductStoreService,
  ErrorHandlingService,
  ToastService,
  ICreateProductRequest,
  ICreateProductResponse,
} from 'shared';

import { ProductApiService } from '../../infrastructure/services/product.service';
import { CreateProductUseCase } from '../create.product.use.case';

describe('CreateProductUseCase (Vitest)', () => {
  let useCase: CreateProductUseCase;

  let productApiServiceMock: ProductApiService;
  let productStoreServiceMock: ProductStoreService;
  let errorHandlingServiceMock: ErrorHandlingService;
  let toastServiceMock: ToastService;

  beforeEach(() => {
    productApiServiceMock = {
      createProduct: vi.fn(),
    } as any;

    productStoreServiceMock = {
      setLoading: vi.fn(),
      addProduct: vi.fn(),
    } as any;

    errorHandlingServiceMock = {
      handleError: vi.fn(),
    } as any;

    toastServiceMock = {
      showToast: vi.fn(),
    } as any;

    useCase = new CreateProductUseCase(
      productApiServiceMock,
      productStoreServiceMock,
      errorHandlingServiceMock,
      toastServiceMock
    );

    vi.clearAllMocks();
  });

  it('should call API and update store on success', () => {
    const req: ICreateProductRequest = {
      id: 'P01',
      name: 'Test',
      description: 'desc',
      logo: 'logo.png',
      date_release: '2025-01-01',
      date_revision: '2026-01-01',
    };

    const res: ICreateProductResponse = {
      data: req,
      message: 'OK',
    };

    (productApiServiceMock.createProduct as any).mockReturnValue(of(res));

    useCase.execute(req).subscribe();

    expect(productStoreServiceMock.setLoading).toHaveBeenCalledWith(true);
    expect(productApiServiceMock.createProduct).toHaveBeenCalledWith(req);
    expect(productStoreServiceMock.addProduct).toHaveBeenCalledWith(req);
    expect(toastServiceMock.showToast).toHaveBeenCalled();
    expect(productStoreServiceMock.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle API error correctly', () => {
    const req: ICreateProductRequest = {
      id: 'ERR01',
      name: 'Error test',
      description: '',
      logo: '',
      date_release: '2025-01-01',
      date_revision: '2026-01-01',
    };

    const mockError = new Error('API Error');

    (productApiServiceMock.createProduct as any).mockReturnValue(
      throwError(() => mockError)
    );

    (errorHandlingServiceMock.handleError as any).mockReturnValue(
      throwError(() => mockError)
    );

    useCase.execute(req).subscribe({
      error: (error) => {
        expect(errorHandlingServiceMock.handleError).toHaveBeenCalled();
        expect(error).toBe(mockError);
      },
    });

    expect(productStoreServiceMock.setLoading).toHaveBeenCalledWith(true);
    expect(productStoreServiceMock.setLoading).toHaveBeenCalledWith(false);
  });

  it('should set loading to true before API call', () => {
    const req = {
      id: 'PRE01',
      name: 'Test',
      description: '',
      logo: '',
      date_release: '2025-01-01',
      date_revision: '2026-01-01',
    };

    (productApiServiceMock.createProduct as any).mockReturnValue(
      of({ data: req })
    );

    useCase.execute(req).subscribe();

    expect(productStoreServiceMock.setLoading.mock.calls[0][0]).toBe(true);
  });

  it('should set loading to false at the end (success)', () => {
    const req = {
      id: 'FIN01',
      name: 'Test',
      description: '',
      logo: '',
      date_release: '2025-01-01',
      date_revision: '2026-01-01',
    };

    (productApiServiceMock.createProduct as any).mockReturnValue(
      of({ data: req })
    );

    useCase.execute(req).subscribe();

    const calls = productStoreServiceMock.setLoading.mock.calls;
    expect(calls[calls.length - 1][0]).toBe(false);
  });

  it('should call showToast with correct success message', () => {
    const req: ICreateProductRequest = {
      id: 'P01',
      name: 'TestProduct',
      description: 'desc',
      logo: 'logo.png',
      date_release: '2025-01-01',
      date_revision: '2026-01-01',
    };

    const res: ICreateProductResponse = {
      data: req,
      message: 'OK',
    };

    (productApiServiceMock.createProduct as any).mockReturnValue(of(res));

    useCase.execute(req).subscribe();

    expect(toastServiceMock.showToast).toHaveBeenCalledWith(
      'Operación Exitosa',
      `Product "TestProduct" created successfully`,
      'success'
    );
  });
});
