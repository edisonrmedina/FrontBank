import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CreateProductUseCase } from '../../../../application/create.product.use.case';
import { GetSelectedProductCase } from '../../../../application/getSelectedProductCase';
import { ProductExistsUseCase } from '../../../../application/product.exists.use.case';
import { UpdateProductUseCase } from '../../../../application/update.product.use.case';
import { IProduct } from '../../../../domain/model/IProduct';
import { IUpdateProductResponse } from '../../../../domain/model/IUpdateProductResponse';
import { ModalBankComponent } from './create-bank.component';

describe('ModalBankComponent', () => {
  let component: ModalBankComponent;
  let fixture: ComponentFixture<ModalBankComponent>;
  let httpTestingController: HttpTestingController;
  let mockCreateProductUseCase: jasmine.SpyObj<CreateProductUseCase>;
  let mockUpdateProductUseCase: jasmine.SpyObj<UpdateProductUseCase>;
  let mockProductExistsUseCase: jasmine.SpyObj<ProductExistsUseCase>;
  let mockGetSelectedProductCase: jasmine.SpyObj<GetSelectedProductCase>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const mockProduct: IProduct = {
    id: 'test123',
    name: 'Test Product',
    description: 'This is a test product description',
    logo: 'https://example.com/logo.png',
    date_release: '2025-03-15',
    date_revision: '2026-03-15'
  };

  beforeEach(async () => {
    // Create spies for use cases
    mockCreateProductUseCase = jasmine.createSpyObj('CreateProductUseCase', ['execute']);
    mockUpdateProductUseCase = jasmine.createSpyObj('UpdateProductUseCase', ['execute']);
    mockProductExistsUseCase = jasmine.createSpyObj('ProductExistsUseCase', ['execute']);
    mockGetSelectedProductCase = jasmine.createSpyObj('GetSelectedProductCase', ['execute']);

    // Configure default mock returns
    mockProductExistsUseCase.execute.and.returnValue(of(  false ));
    mockCreateProductUseCase.execute.and.returnValue(of({ message: 'Product created successfully', data: mockProduct })); // Assuming you want to return a mockProduct after creation
    mockUpdateProductUseCase.execute.and.returnValue(of({ message: 'Product updated successfully', data: mockProduct })); // Assuming you want to return a 
    mockGetSelectedProductCase.execute.and.returnValue(of(mockProduct));

    await TestBed.configureTestingModule({
      imports: [
        ModalBankComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            paramMap: of(convertToParamMap({})),
            queryParamMap: of(convertToParamMap({})),
            queryParams: of({}),
            snapshot: {
              params: {},
              paramMap: convertToParamMap({}),
              queryParamMap: convertToParamMap({}),
              queryParams: {}
            }
          }
        },
        { provide: Router, useValue: mockRouter },
        { provide: CreateProductUseCase, useValue: mockCreateProductUseCase },
        { provide: UpdateProductUseCase, useValue: mockUpdateProductUseCase },
        { provide: ProductExistsUseCase, useValue: mockProductExistsUseCase },
        { provide: GetSelectedProductCase, useValue: mockGetSelectedProductCase }
      ]
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ModalBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with all required fields', () => {
    expect(component.productForm).toBeDefined();
    expect(component.productForm.get('id')).toBeDefined();
    expect(component.productForm.get('name')).toBeDefined();
    expect(component.productForm.get('description')).toBeDefined();
    expect(component.productForm.get('logo')).toBeDefined();
    expect(component.productForm.get('date_release')).toBeDefined();
    expect(component.productForm.get('date_revision')).toBeDefined();
  });

  it('should validate required fields', () => {
    const form = component.productForm;
    
    // All fields should initially be invalid or empty
    expect(form.valid).toBeFalsy();
    
    // Set valid values for all fields
    form.patchValue({
      id: 'test123',
      name: 'Test Product',
      description: 'This is a test product description',
      logo: 'https://example.com/logo.png',
      date_release: new Date().toISOString().split('T')[0],
      date_revision: new Date().toISOString().split('T')[0]
    });
    
    expect(form.valid).toBeTruthy();
  });

  it('should validate ID field constraints', () => {
    const idControl = component.productForm.get('id');
    
    // ID too short
    idControl?.setValue('ab');
    expect(idControl?.valid).toBeFalsy();
    expect(idControl?.errors?.['minlength']).toBeTruthy();
    
    // ID valid length
    idControl?.setValue('abc');
    expect(idControl?.errors?.['minlength']).toBeFalsy();
    
    // ID too long
    idControl?.setValue('12345678901'); // 11 characters
    expect(idControl?.valid).toBeFalsy();
    expect(idControl?.errors?.['maxlength']).toBeTruthy();
    
    // ID valid length
    idControl?.setValue('1234567890'); // 10 characters
    expect(idControl?.errors?.['maxlength']).toBeFalsy();
  });

  it('should automatically set date_revision to one year after date_release', () => {
    const dateReleaseControl = component.productForm.get('date_release');
    const dateRevisionControl = component.productForm.get('date_revision');
    
    // Set release date
    const releaseDate = '2025-04-15';
    dateReleaseControl?.setValue(releaseDate);
    
    // Expected revision date (one year later)
    const expectedRevisionDate = '2026-04-15';
    
    expect(dateRevisionControl?.value).toBe(expectedRevisionDate);
  });

  it('should validate release date is not in the past', () => {
    const dateReleaseControl = component.productForm.get('date_release');
    
    // Set past date
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const pastDateString = pastDate.toISOString().split('T')[0];
    
    dateReleaseControl?.setValue(pastDateString);
    expect(dateReleaseControl?.valid).toBeFalsy();
    expect(dateReleaseControl?.errors?.['invalidDate']).toBeTruthy();
    
    // Set future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateString = futureDate.toISOString().split('T')[0];
    
    dateReleaseControl?.setValue(futureDateString);
    expect(dateReleaseControl?.errors?.['invalidDate']).toBeFalsy();
  });

  it('should enter edit mode when query param is set', () => {
    // Create a new component with edit mode query param
    TestBed.resetTestingModule();
    
    TestBed.configureTestingModule({
      imports: [ModalBankComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: mockRouter },
        { provide: CreateProductUseCase, useValue: mockCreateProductUseCase },
        { provide: UpdateProductUseCase, useValue: mockUpdateProductUseCase },
        { provide: ProductExistsUseCase, useValue: mockProductExistsUseCase },
        { provide: GetSelectedProductCase, useValue: mockGetSelectedProductCase },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ mode: 'edit' }),
            snapshot: {
              queryParams: { mode: 'edit' }
            }
          }
        }
      ]
    });
    
    fixture = TestBed.createComponent(ModalBankComponent);
    component = fixture.componentInstance;
    component.productToEdit = mockProduct;
    
    // Initialize component
    component.ngOnInit();
    
    expect(component.isEditMode).toBeTrue();
    expect(mockGetSelectedProductCase.execute).toHaveBeenCalled();
  });

  it('should populate form when in edit mode', fakeAsync(() => {
    // Set edit mode and product data
    component.isEditMode = true;
    component.productToEdit = mockProduct;
    
    // Call the method directly to test it
    component.populateFormForEditing();
    tick();
    
    // Verify form is populated correctly
    expect(component.productForm.get('id')?.value).toBe(mockProduct.id);
    expect(component.productForm.get('name')?.value).toBe(mockProduct.name);
    expect(component.productForm.get('description')?.value).toBe(mockProduct.description);
    expect(component.productForm.get('logo')?.value).toBe(mockProduct.logo);
    
    // Verify ID is disabled in edit mode
    expect(component.productForm.get('id')?.disabled).toBeTrue();
  }));

  it('should handle form reset correctly', () => {
    // Fill form with data
    component.productForm.patchValue({
      id: 'test123',
      name: 'Test Product',
      description: 'Test description',
      logo: 'https://example.com/logo.png',
      date_release: '2025-07-15',
      date_revision: '2026-07-15'
    });
    
    // Reset form
    component.resetForm();
    
    // Check that all fields are reset
    expect(component.productForm.get('id')?.value).toBeFalsy();
    expect(component.productForm.get('name')?.value).toBeFalsy();
    expect(component.productForm.get('description')?.value).toBeFalsy();
    expect(component.productForm.get('logo')?.value).toBeFalsy();
    expect(component.productForm.get('date_release')?.value).toBeFalsy();
    expect(component.productForm.get('date_revision')?.value).toBeFalsy();
  });

  it('should emit closeModal event when closeModalBank is called', () => {
    spyOn(component.closeModal, 'emit');
    
    component.closeModalBank();
    
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should handle error when creating product fails', fakeAsync(() => {
    // Ensure not in edit mode
    component.isEditMode = false;
    
    // Fill form with valid data
    component.productForm.patchValue({
      id: 'newprod123',
      name: 'New Product',
      description: 'This is a new product description',
      logo: 'https://example.com/newlogo.png',
      date_release: '2025-08-15',
      date_revision: '2026-08-15'
    });
    
    // Mock error response
    mockCreateProductUseCase.execute.and.returnValue(throwError(() => new Error('Creation failed')));
    
    // Spy on console.error
    spyOn(console, 'error');
    
    // Submit form
    component.submitForm();
    tick();
    
    expect(console.error).toHaveBeenCalledWith('Error al crear el producto', jasmine.any(Error));
  }));

  it('should handle error when updating product fails', fakeAsync(() => {
    // Set edit mode
    component.isEditMode = true;
    
    // Fill form with valid data
    component.productForm.patchValue({
      id: 'test123',
      name: 'Updated Product',
      description: 'This is an updated description',
      logo: 'https://example.com/updatedlogo.png',
      date_release: '2025-09-15',
      date_revision: '2026-09-15'
    });
    
    // Enable ID field for testing
    component.productForm.get('id')?.enable();
    
    // Mock error response
    mockUpdateProductUseCase.execute.and.returnValue(throwError(() => new Error('Update failed')));
    
    // Spy on console.error
    spyOn(console, 'error');
    
    // Submit form
    component.submitForm();
    tick();
    
    expect(console.error).toHaveBeenCalledWith('Error al editar el producto', jasmine.any(Error));
  }));

  it('should mark all fields as touched when invalid form is submitted', () => {
    // Create a spy on the markAllAsTouched method
    spyOn(component.productForm, 'markAllAsTouched');
    
    // Make form invalid
    component.productForm.get('id')?.setValue('');
    
    // Submit form
    component.submitForm();
    
    // Verify markAllAsTouched was called
    expect(component.productForm.markAllAsTouched).toHaveBeenCalled();
  });
});