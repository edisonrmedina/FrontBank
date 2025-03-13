import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { DeleteProductUseCase } from '../../../../application/delete.product.use.case';
import { IProduct } from '../../../../domain/model/IProduct';
import { ModalDeleteBankComponent } from './modal.delete.bank.component';

describe('ModalDeleteBankComponent', () => {
  let component: ModalDeleteBankComponent;
  let fixture: ComponentFixture<ModalDeleteBankComponent>;
  let deleteProductUseCaseSpy: jasmine.SpyObj<DeleteProductUseCase>;
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

    TestBed.configureTestingModule({
      imports: [ModalDeleteBankComponent], // Import the standalone component
      providers: [
        { provide: DeleteProductUseCase, useValue: deleteProductUseCaseSpy },
      ],
      //declarations: [ModalDeleteBankComponent], // REMOVE this line
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDeleteBankComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize productTitle with item name on ngOnInit', () => {
    component.item = mockProduct;
    component.ngOnInit();
    expect(component.productToDelete.name).toBe(mockProduct.name);
  });

  it('should set productTitle to empty string if item is null on ngOnInit', () => {
    component.item = null;
    component.ngOnInit();
    expect(component.productToDelete.name).toBe('');
  });

  it('should call deleteProductUseCase.execute with item id on deleteItem', () => {
    deleteProductUseCaseSpy.execute.and.returnValue(of({
      message: 'Product deleted successfully',
    })); 
    component.deleteItem(mockProduct);
    expect(deleteProductUseCaseSpy.execute).toHaveBeenCalledWith(mockProduct.id);
  });

  it('should set isVisible to false and emit cancel event on deleteItem success', fakeAsync(() => {
    deleteProductUseCaseSpy.execute.and.returnValue(of({
      message: 'Product deleted successfully',
    })); 
    spyOn(component.cancel, 'emit');
    component.isVisible = true;

    component.deleteItem(mockProduct);
    fixture.detectChanges(); 

    tick();
    fixture.detectChanges();

    expect(component.isVisible).toBe(false);
    expect(component.cancel.emit).toHaveBeenCalled();
  }));

  it('should log an error message when deleteProductUseCase.execute fails', () => {
    const consoleSpy = spyOn(console, 'error');
    deleteProductUseCaseSpy.execute.and.returnValue(throwError('Delete Error'));
    component.deleteItem(mockProduct);
    expect(consoleSpy).toHaveBeenCalledWith('Delete product error:', 'Delete Error');
  });

  it('should set isVisible to false and emit cancel event on onCancel', () => {
    spyOn(component.cancel, 'emit');
    component.isVisible = true;
    component.onCancel();
    expect(component.isVisible).toBe(false);
    expect(component.cancel.emit).toHaveBeenCalled();
  });

});

