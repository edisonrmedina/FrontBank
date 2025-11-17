// @ts-nocheck
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { of, throwError } from 'rxjs';

import {
  ProductQuery,
  ProductStoreService,
  ErrorHandlingService,
  IProduct,
} from 'shared';

import { GetSelectedProductCase } from '../getSelectedProductCase';

describe('GetSelectedProductCase (Vitest)', () => {
  let useCase: GetSelectedProductCase;

  let productQueryMock: ProductQuery;
  let productStoreMock: ProductStoreService;
  let errorHandlerMock: ErrorHandlingService;

  beforeEach(() => {
    productQueryMock = {
      selectSelectedProduct: vi.fn(),
    } as any;

    productStoreMock = {
      setLoading: vi.fn(),
    } as any;

    errorHandlerMock = {
      handleError: vi.fn(),
    } as any;

    useCase = new GetSelectedProductCase(
      productQueryMock,
      productStoreMock,
      errorHandlerMock
    );

    vi.clearAllMocks();
  });

  // 1️⃣ should return selected product
  it('should return selected product when query emits a product', () => {
    const product: IProduct = {
      id: '1',
      name: 'Test Product',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };

    (productQueryMock.selectSelectedProduct as any).mockReturnValue(
      of(product)
    );

    useCase.execute().subscribe((result) => {
      expect(result).toEqual(product);
    });
  });

  // 2️⃣ should return null if query emits null
  it('should return null when no product is selected', () => {
    (productQueryMock.selectSelectedProduct as any).mockReturnValue(of(null));

    useCase.execute().subscribe((result) => {
      expect(result).toBeNull();
    });
  });

  // 3️⃣ should handle errors correctly
  it('should call handleError when query throws error', () => {
    const mockError = new Error('Query Error');

    (productQueryMock.selectSelectedProduct as any).mockReturnValue(
      throwError(() => mockError)
    );

    useCase.execute().subscribe({
      error: (err) => {
        expect(errorHandlerMock.handleError).toHaveBeenCalledWith(
          mockError,
          'Error getting selected product'
        );
        expect(err).toBe(mockError);
      },
    });
  });

  // 4️⃣ should call setLoading(false) on finalize
  it('should set loading to false on finalize', () => {
    (productQueryMock.selectSelectedProduct as any).mockReturnValue(of(null));

    useCase.execute().subscribe();

    const calls = productStoreMock.setLoading.mock.calls;
    expect(calls[calls.length - 1][0]).toBe(false);
  });
});
