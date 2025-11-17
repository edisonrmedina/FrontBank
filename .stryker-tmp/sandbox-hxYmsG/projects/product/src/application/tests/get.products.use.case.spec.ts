// @ts-nocheck
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { of, throwError } from 'rxjs';

import {
  ProductStoreService,
  ErrorHandlingService,
  ToastService,
  IProduct,
} from 'shared';

import { ProductApiService } from '../../infrastructure/services/product.service';
import { GetAllProductsUseCase } from '../get.products.use.case';

describe('GetAllProductsUseCase (Vitest)', () => {
  let useCase: GetAllProductsUseCase;

  let productApiServiceMock: ProductApiService;
  let productStoreServiceMock: ProductStoreService;
  let errorHandlingMock: ErrorHandlingService;
  let toastServiceMock: ToastService;

  beforeEach(() => {
    productApiServiceMock = {
      getAllProducts: vi.fn(),
    } as any;

    productStoreServiceMock = {
      setLoading: vi.fn(),
      setProducts: vi.fn(),
    } as any;

    errorHandlingMock = {
      handleError: vi.fn(),
    } as any;

    toastServiceMock = {
      showToast: vi.fn(),
    } as any;

    useCase = new GetAllProductsUseCase(
      productApiServiceMock,
      productStoreServiceMock,
      errorHandlingMock,
      toastServiceMock
    );

    vi.clearAllMocks();
  });

  // ------------------------------------------------------------------
  it('should start loading before calling API', () => {
    (productApiServiceMock.getAllProducts as any).mockReturnValue(
      of({ data: [] })
    );

    useCase.execute().subscribe();

    expect(productStoreServiceMock.setLoading).toHaveBeenCalledWith(true);
  });

  // ------------------------------------------------------------------
  it('should set products in store when API returns data', () => {
    const mockProducts: IProduct[] = [
      { id: '1', name: 'P1' } as any,
      { id: '2', name: 'P2' } as any,
    ];

    (productApiServiceMock.getAllProducts as any).mockReturnValue(
      of({ data: mockProducts })
    );

    useCase.execute().subscribe();

    expect(productStoreServiceMock.setProducts).toHaveBeenCalledWith(
      mockProducts
    );
  });

  // ------------------------------------------------------------------
  it('should show warning toast when API returns an empty list', () => {
    (productApiServiceMock.getAllProducts as any).mockReturnValue(
      of({ data: [] })
    );

    useCase.execute().subscribe();

    expect(toastServiceMock.showToast).toHaveBeenCalledWith(
      'Advertencia',
      'No se encontraron productos',
      'warning'
    );
  });

  // ------------------------------------------------------------------
  it('should call error handler when API fails', () => {
    const err = new Error('Network fail');

    (productApiServiceMock.getAllProducts as any).mockReturnValue(
      throwError(() => err)
    );

    useCase.execute().subscribe({
      error: () => {},
    });

    expect(errorHandlingMock.handleError).toHaveBeenCalledWith(
      err,
      'Error fetching all products'
    );
  });
});
