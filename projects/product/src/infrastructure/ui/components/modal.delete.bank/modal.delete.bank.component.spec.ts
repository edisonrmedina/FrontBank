import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { DeleteProductUseCase } from '../../../../application/delete.product.use.case';
import { GetSelectedProductCase } from '../../../../application/getSelectedProductCase';
import { IProduct } from '../../../../domain/model/IProduct';
import { ModalDeleteBankComponent } from './modal.delete.bank.component';

describe('ModalDeleteBankComponent', () => {
  let component: ModalDeleteBankComponent;
  let fixture: ComponentFixture<ModalDeleteBankComponent>;
  let deleteProductUseCaseSpy: jasmine.SpyObj<DeleteProductUseCase>;
  let getSelectedProductSpy: jasmine.SpyObj<GetSelectedProductCase>;
  let el: DebugElement;

  const mockProduct: IProduct = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    logo: 'test.jpg',
    date_release: '2024-01-01',
    date_revision: '2025-01-01',
  };

  beforeEach(() => {
    deleteProductUseCaseSpy = jasmine.createSpyObj('DeleteProductUseCase', ['execute']);
    getSelectedProductSpy = jasmine.createSpyObj('GetSelectedProductCase', ['execute']);

    TestBed.configureTestingModule({
      imports: [ModalDeleteBankComponent],
      providers: [
        { provide: DeleteProductUseCase, useValue: deleteProductUseCaseSpy },
        { provide: GetSelectedProductCase, useValue: getSelectedProductSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDeleteBankComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set productToDelete from GetSelectedProductCase', () => {
      getSelectedProductSpy.execute.and.returnValue(of(mockProduct));
      component.ngOnInit();
      expect(component.productToDelete).toEqual(mockProduct);
      expect(getSelectedProductSpy.execute).toHaveBeenCalled();
    });
  });

  describe('deleteItem', () => {
    it('should call deleteProductUseCase.execute with product id', () => {
      deleteProductUseCaseSpy.execute.and.returnValue(of({ message: 'Success' }));
      component.productToDelete = mockProduct;
      
      component.deleteItem();
      
      expect(deleteProductUseCaseSpy.execute).toHaveBeenCalledWith(mockProduct.id);
    });

    it('should handle success case correctly', fakeAsync(() => {
      deleteProductUseCaseSpy.execute.and.returnValue(of({ message: 'Success' }));
      const cancelSpy = spyOn(component.cancel, 'emit');
      component.isVisible = true;
      component.productToDelete = mockProduct;

      component.deleteItem();
      tick();
      
      expect(component.isVisible).toBeFalse();
      expect(cancelSpy).toHaveBeenCalled();
    }));


  });

  describe('onCancel', () => {
    it('should close modal and emit cancel event', () => {
      const cancelSpy = spyOn(component.cancel, 'emit');
      component.isVisible = true;

      component.onCancel();
      
      expect(component.isVisible).toBeFalse();
      expect(cancelSpy).toHaveBeenCalled();
    });
  });

  
});