import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SelectProductCase } from '../../../../application/select-product-use-case';
import { IProduct } from '../../../../domain/model/IProduct';
import { ITableBankAction } from '../../interfaces/ITableBankAction';
import { ModalBankComponent } from '../createBank/create-bank.component';
import { ModalDeleteBankComponent } from '../modal.delete.bank/modal.delete.bank.component';
import { tableBankComponent } from './tableBank.component';

describe('tableBankComponent', () => {
  let component: tableBankComponent;
  let fixture: ComponentFixture<tableBankComponent>;
  let el: DebugElement;
  let routerSpy: jasmine.SpyObj<Router>;
  let selectProductCaseSpy: jasmine.SpyObj<SelectProductCase>;

  const mockProducts: IProduct[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Desc 1',
      logo: 'product.png',
      date_release: '2024-01-01',
      date_revision: '2025-01-01',
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Desc 2',
      logo: 'product.png',
      date_release: '2024-02-01',
      date_revision: '2025-02-01',
    },
  ];

  const mockActions: ITableBankAction[] = [
    { label: 'Editar', icon: 'fa fa-edit', onClick: () => {} },
    { label: 'Eliminar', icon: 'fa fa-trash', onClick: () => {} },
  ];

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    selectProductCaseSpy = jasmine.createSpyObj('SelectProductCase', [
      'execute',
    ]);

    TestBed.configureTestingModule({
      imports: [
        tableBankComponent,
        ModalDeleteBankComponent,
        ModalBankComponent,
      ], // Import standalone components
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerSpy },
        { provide: SelectProductCase, useValue: selectProductCaseSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(tableBankComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.data = mockProducts;
    component.actions = mockActions;
    component.headers = ['Logo', 'Nombre Producto', 'Descripcion'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the table headers', () => {
    const headerElements = el.queryAll(By.css('th'));
    expect(headerElements.length).toBe(component.headers.length + 1); // +1 for "Acciones" column
    expect(headerElements[0].nativeElement.textContent).toContain('Logo');
    expect(headerElements[1].nativeElement.textContent).toContain(
      'Nombre Producto'
    );
    expect(headerElements[2].nativeElement.textContent).toContain(
      'Descripcion'
    );
    expect(headerElements[3].nativeElement.textContent).toContain('Acciones');
  });

  it('should set modalIsVisible to false on closeModal', () => {
    component.modalIsVisible = true;
    component.closeModal(); // No necesita un evento
    expect(component.modalIsVisible).toBe(false);
  });

  it('should toggle showActions on toggleVisibility', () => {
    // Crea un objeto IProduct de ejemplo para la prueba
    const mockProduct: IProduct = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'logo1.png',
      date_release: '2024-01-01',
      date_revision: '2025-01-01',
    };

    component.dropdownStates[mockProduct.id] = false;
    component.toggleVisibility(mockProduct);
    expect(component.dropdownStates[mockProduct.id]).toBe(true);
    component.toggleVisibility(mockProduct);
    expect(component.dropdownStates[mockProduct.id]).toBe(false);

  });
  
});
