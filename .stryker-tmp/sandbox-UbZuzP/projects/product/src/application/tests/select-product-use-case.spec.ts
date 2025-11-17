import { describe, beforeEach, it, expect, vi } from 'vitest';
import { of, throwError } from 'rxjs';

import { ProductStoreService, ErrorHandlingService, IProduct } from 'shared';

import { SelectProductCase } from '../select-product-use-case';

describe('SelectProductCase (Vitest)', () => {
  let useCase: SelectProductCase;

  let storeMock: ProductStoreService;
  let errorHandlerMock: ErrorHandlingService;

  beforeEach(() => {
    storeMock = {
      setSelectedProduct: vi.fn(),
      setLoading: vi.fn(),
    } as any;

    errorHandlerMock = {
      handleError: vi.fn(),
    } as any;

    useCase = new SelectProductCase(storeMock, errorHandlerMock);

    vi.clearAllMocks();
  });

  // 1️⃣ Selección correcta → retorna true
  it('should return true when product is selected successfully', () => {
    const product: IProduct = { id: 'P1' } as any;

    (storeMock.setSelectedProduct as any).mockReturnValue(undefined);

    useCase.execute(product).subscribe((result) => {
      expect(result).toBe(true);
    });

    expect(storeMock.setSelectedProduct).toHaveBeenCalledWith(product);
  });

  // 2️⃣ Error → catchError retorna false y llama handleError
  it('should return false and call errorHandler when an error occurs', () => {
    const product: IProduct = { id: 'ERR1' } as any;

    (storeMock.setSelectedProduct as any).mockImplementation(() => {
      throw new Error('Fail!');
    });

    useCase.execute(product).subscribe((result) => {
      expect(result).toBe(false);
      expect(errorHandlerMock.handleError).toHaveBeenCalled();
    });
  });

  // 3️⃣ finalize debe ejecutar setLoading(false)
  it('should call setLoading(false) after completion', () => {
    const product: IProduct = { id: 'ABC' } as any;

    (storeMock.setSelectedProduct as any).mockReturnValue(undefined);

    useCase.execute(product).subscribe();

    const calls = storeMock.setLoading.mock.calls;
    expect(calls[calls.length - 1][0]).toBe(false);
  });

  // 4️⃣ log de error + mensaje de error correcto
  it('should log correct error message when selection fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const product: IProduct = { id: 'LOG1' } as any;

    const err = new Error('Boom');
    (storeMock.setSelectedProduct as any).mockImplementation(() => {
      throw err;
    });

    useCase.execute(product).subscribe(() => {});

    expect(consoleSpy).toHaveBeenCalledWith('Error selecting product:', err);

    expect(errorHandlerMock.handleError).toHaveBeenCalledWith(
      err,
      `Error selecting product with ID LOG1`
    );

    consoleSpy.mockRestore();
  });
});
