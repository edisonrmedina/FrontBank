import { describe, beforeEach, it, expect, vi } from 'vitest';
import { of, throwError } from 'rxjs';

import { ProductStoreService, ErrorHandlingService } from 'shared';
import { ProductApiService } from '../../infrastructure/services/product.service';
import { ProductExistsUseCase } from '../product.exists.use.case';

describe('ProductExistsUseCase (Vitest)', () => {
  let useCase: ProductExistsUseCase;

  let apiMock: ProductApiService;
  let storeMock: ProductStoreService;
  let errorHandlerMock: ErrorHandlingService;

  beforeEach(() => {
    apiMock = {
      productExists: vi.fn(),
    } as any;

    storeMock = {
      setLoading: vi.fn(),
    } as any;

    errorHandlerMock = {
      handleError: vi.fn(),
    } as any;

    useCase = new ProductExistsUseCase(apiMock, storeMock, errorHandlerMock);

    vi.clearAllMocks();
  });

  it('should return API result when productExists emits value', () => {
    (apiMock.productExists as any).mockReturnValue(of(true));

    let result = false;
    useCase.execute('ID123').subscribe((v) => (result = v));

    expect(apiMock.productExists).toHaveBeenCalledWith('ID123');
    expect(result).toBe(true);
  });

  it('should call setLoading(true) then setLoading(false)', () => {
    (apiMock.productExists as any).mockReturnValue(of(true));

    useCase.execute('ABC').subscribe();

    expect(storeMock.setLoading.mock.calls[0][0]).toBe(true);
    const calls = storeMock.setLoading.mock.calls;
    expect(calls[calls.length - 1][0]).toBe(false);
  });

  // ✅ FIX: este es el que fallaba en Stryker
  it('should call handleError when API throws error', async () => {
    const err = new Error('API Failure');

    (apiMock.productExists as any).mockReturnValue(throwError(() => err));

    (errorHandlerMock.handleError as any).mockReturnValue(
      throwError(() => err)
    );

    return new Promise((resolve) => {
      useCase.execute('XYZ').subscribe({
        error: (e) => {
          expect(errorHandlerMock.handleError).toHaveBeenCalledWith(
            err,
            'Error checking if product with ID XYZ exists'
          );
          expect(e).toBe(err);
          resolve(true);
        },
      });
    });
  });
});
