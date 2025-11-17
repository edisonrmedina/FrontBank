import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, throwError } from 'rxjs';

import { DeleteProductUseCase } from '../../../../application/delete.product.use.case';
import { ModalDeleteBankComponent } from './modal.delete.bank.component';
import { IProduct } from 'shared';

describe('ModalDeleteBankComponent (Vitest)', () => {
  let component: ModalDeleteBankComponent;
  let deleteProductUseCaseMock: DeleteProductUseCase;

  const mockProduct: IProduct = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    logo: 'test.jpg',
    date_release: '2024-01-01',
    date_revision: '2025-01-01',
  };

  beforeEach(() => {
    deleteProductUseCaseMock = {
      execute: vi.fn(),
    } as any;

    component = new ModalDeleteBankComponent();
    component.cancel.emit = vi.fn(); // mock del EventEmitter
  });

  // -------------------------------------------------------
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -------------------------------------------------------
  it('should initialize productToDelete with item name on ngOnInit', () => {
    component.item = mockProduct;

    component.ngOnInit();

    expect(component.productToDelete.name).toBe(mockProduct.name);
  });
});
