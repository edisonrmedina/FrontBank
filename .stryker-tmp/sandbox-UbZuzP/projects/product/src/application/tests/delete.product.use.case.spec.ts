// @ts-nocheck
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { firstValueFrom, of, throwError } from 'rxjs';

import {
  ProductStoreService,
  ErrorHandlingService,
  ToastService,
  IDeleteProductResponse,
} from 'shared';

import { ProductApiService } from '../../infrastructure/services/product.service';
import { DeleteProductUseCase } from '../delete.product.use.case';

describe('DeleteProductUseCase (Vitest)', () => {
  let useCase: DeleteProductUseCase;

  let productApiServiceMock: ProductApiService;
  let productStoreServiceMock: ProductStoreService;
  let errorHandlingServiceMock: ErrorHandlingService;
  let toastServiceMock: ToastService;

  beforeEach(() => {
    productApiServiceMock = {
      deleteProduct: vi.fn(),
    } as any;

    productStoreServiceMock = {
      setLoading: vi.fn(),
      deleteProduct: vi.fn(),
    } as any;

    errorHandlingServiceMock = {
      handleError: vi.fn(),
    } as any;

    toastServiceMock = {
      showToast: vi.fn(),
    } as any;

    useCase = new DeleteProductUseCase(
      productApiServiceMock,
      productStoreServiceMock,
      errorHandlingServiceMock,
      toastServiceMock
    );

    vi.clearAllMocks();
  });

  // -------------------------------------------------------------
  it('should call API, update store and show toast on success', () => {
    const id = 'PROD-123';

    const response: IDeleteProductResponse = {
      message: 'Deleted',
    };

    (productApiServiceMock.deleteProduct as any).mockReturnValue(of(response));

    useCase.execute(id).subscribe();

    // 1. Loading inicial
    expect(productStoreServiceMock.setLoading.mock.calls[0][0]).toBe(true);

    // 2. API call
    expect(productApiServiceMock.deleteProduct).toHaveBeenCalledWith(id);

    // 3. Store updated
    expect(productStoreServiceMock.deleteProduct).toHaveBeenCalledWith(id);

    // 4. Toast
    expect(toastServiceMock.showToast).toHaveBeenCalled();

    // 5. Loading final
    const calls = productStoreServiceMock.setLoading.mock.calls;
    expect(calls[calls.length - 1][0]).toBe(false);
  });

  // -------------------------------------------------------------
  it('should handle error when API fails', async () => {
    const id = 'ERR-001';
    const mockError = new Error('Server error');

    // API falla
    (productApiServiceMock.deleteProduct as any).mockReturnValue(
      throwError(() => mockError)
    );

    // ErrorHandler también devuelve error
    (errorHandlingServiceMock.handleError as any).mockReturnValue(
      throwError(() => mockError)
    );

    // Ejecutar caso de uso y esperar rechazo
    await expect(firstValueFrom(useCase.execute(id))).rejects.toThrow(
      'Server error'
    );

    expect(productStoreServiceMock.setLoading.mock.calls[0][0]).toBe(true);

    expect(errorHandlingServiceMock.handleError).toHaveBeenCalledWith(
      mockError,
      `Product deletion failed: ${id}`
    );

    expect(productStoreServiceMock.deleteProduct).not.toHaveBeenCalled();

    expect(toastServiceMock.showToast).not.toHaveBeenCalled();

    const calls = productStoreServiceMock.setLoading.mock.calls;
    expect(calls[calls.length - 1][0]).toBe(false);
  });

  // -------------------------------------------------------------
  it('should make setLoading(true) the FIRST call', () => {
    const id = 'ABC-10';

    (productApiServiceMock.deleteProduct as any).mockReturnValue(
      of({ message: 'OK' })
    );

    useCase.execute(id).subscribe();

    expect(productStoreServiceMock.setLoading.mock.calls[0][0]).toBe(true);
  });

  // -------------------------------------------------------------
  it('should make setLoading(false) the LAST call', () => {
    const id = 'XYZ-99';

    (productApiServiceMock.deleteProduct as any).mockReturnValue(
      of({ message: 'OK' })
    );

    useCase.execute(id).subscribe();

    const calls = productStoreServiceMock.setLoading.mock.calls;
    expect(calls[calls.length - 1][0]).toBe(false);
  });
});
