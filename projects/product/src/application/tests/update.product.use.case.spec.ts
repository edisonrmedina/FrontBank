import { describe, beforeEach, it, expect, vi } from 'vitest';
import { of, throwError } from 'rxjs';

import {
  ProductStoreService,
  ErrorHandlingService,
  ToastService,
  IUpdateProductInput,
  IUpdateProductResponse,
} from 'shared';

import { ProductApiService } from '../../infrastructure/services/product.service';
import { UpdateProductUseCase } from '../update.product.use.case';

describe('UpdateProductUseCase (Vitest)', () => {
  let useCase: UpdateProductUseCase;

  let apiMock: ProductApiService;
  let storeMock: ProductStoreService;
  let errorHandlerMock: ErrorHandlingService;
  let toastMock: ToastService;

  beforeEach(() => {
    apiMock = {
      updateProduct: vi.fn(),
    } as any;

    storeMock = {
      setLoading: vi.fn(),
      updateProduct: vi.fn(),
    } as any;

    errorHandlerMock = {
      handleError: vi.fn(),
    } as any;

    toastMock = {
      showToast: vi.fn(),
    } as any;

    useCase = new UpdateProductUseCase(
      apiMock,
      storeMock,
      errorHandlerMock,
      toastMock
    );

    vi.clearAllMocks();
  });

  // 1️⃣ Caso de éxito completo
  it('should update product, show toast and stop loading on success', () => {
    const input: IUpdateProductInput = {
      id: 'P01',
      product: { name: 'Updated product' } as any,
    };

    const response: IUpdateProductResponse = {
      data: input.product,
      message: 'OK',
    };

    (apiMock.updateProduct as any).mockReturnValue(of(response));

    useCase.execute(input).subscribe();

    expect(storeMock.setLoading).toHaveBeenCalledWith(true);
    expect(apiMock.updateProduct).toHaveBeenCalledWith('P01', input.product);
    expect(storeMock.updateProduct).toHaveBeenCalledWith('P01', input.product);

    expect(toastMock.showToast).toHaveBeenCalledWith(
      'Operación Exitosa',
      `Producto "Updated product" actualizado correctamente`,
      'success'
    );

    const calls = storeMock.setLoading.mock.calls;
    expect(calls[calls.length - 1][0]).toBe(false);
  });

  // 2️⃣ Manejo de error: debe llamar handleError y relanzar error
  it('should handle error correctly and rethrow it', () => {
    const input: IUpdateProductInput = {
      id: 'ERR1',
      product: { name: 'Bad product' } as any,
    };

    const err = new Error('API fail');

    (apiMock.updateProduct as any).mockReturnValue(throwError(() => err));
    (errorHandlerMock.handleError as any).mockReturnValue(
      throwError(() => err)
    );

    useCase.execute(input).subscribe({
      error: (e) => {
        expect(e).toBe(err);
        expect(errorHandlerMock.handleError).toHaveBeenCalledWith(
          err,
          `Error updating product with ID ERR1`
        );
      },
    });

    expect(storeMock.setLoading).toHaveBeenCalledWith(true);

    const calls = storeMock.setLoading.mock.calls;
    expect(calls[calls.length - 1][0]).toBe(false);
  });

  // 3️⃣ Debe loguear un mensaje exacto cuando ocurre error
  it('should log correct error message when update fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const input: IUpdateProductInput = {
      id: 'X1',
      product: { name: 'Something' } as any,
    };

    const err = new Error('Boom');
    (apiMock.updateProduct as any).mockReturnValue(throwError(() => err));
    (errorHandlerMock.handleError as any).mockReturnValue(
      throwError(() => err)
    );

    useCase.execute(input).subscribe({
      error: () => {},
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      `Error updating product with ID X1:`,
      err
    );

    consoleSpy.mockRestore();
  });

  // 4️⃣ finalize → siempre debe llamar setLoading(false)
  it('should always call setLoading(false) in finalize', () => {
    const input: IUpdateProductInput = {
      id: 'Z99',
      product: {} as any,
    };

    (apiMock.updateProduct as any).mockReturnValue(
      throwError(() => new Error())
    );

    useCase.execute(input).subscribe({
      error: () => {},
    });

    const calls = storeMock.setLoading.mock.calls;
    expect(calls[calls.length - 1][0]).toBe(false);
  });
});
