// @ts-nocheck
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

  // 1️⃣ retorna true o false desde el API
  it('should return API result when productExists emits value', () => {
    (apiMock.productExists as any).mockReturnValue(of(true));

    useCase.execute('ID123').subscribe((value) => {
      expect(value).toBe(true);
    });

    expect(apiMock.productExists).toHaveBeenCalledWith('ID123');
  });

  // 2️⃣ setLoading(true) antes, setLoading(false) después
  it('should call setLoading(true) then setLoading(false)', () => {
    (apiMock.productExists as any).mockReturnValue(of(true));

    useCase.execute('ABC').subscribe();

    expect(storeMock.setLoading.mock.calls[0][0]).toBe(true);

    const calls = storeMock.setLoading.mock.calls;
    expect(calls[calls.length - 1][0]).toBe(false);
  });

  // 3️⃣ maneja el catchError correctamente
  it('should call handleError when API throws error', () => {
    const err = new Error('API Failure');

    (apiMock.productExists as any).mockReturnValue(throwError(() => err));

    (errorHandlerMock.handleError as any).mockReturnValue(
      throwError(() => err)
    );

    useCase.execute('XYZ').subscribe({
      error: (e) => {
        expect(errorHandlerMock.handleError).toHaveBeenCalledWith(
          err,
          'Error checking if product with ID XYZ exists'
        );
        expect(e).toBe(err);
      },
    });
  });

  // 4️⃣ garantiza que finalize se ejecuta aunque haya error
  it('should set loading to false even when error occurs', () => {
    const err = new Error('Boom');

    (apiMock.productExists as any).mockReturnValue(throwError(() => err));

    (errorHandlerMock.handleError as any).mockReturnValue(
      throwError(() => err)
    );

    useCase.execute('ERROR123').subscribe({
      error: () => {
        const calls = storeMock.setLoading.mock.calls;
        expect(calls[calls.length - 1][0]).toBe(false);
      },
    });
  });
});
