// import { HttpClient, provideHttpClient } from '@angular/common/http';
// import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
// import { DebugElement } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
// import { of } from 'rxjs';
// import { IProduct } from '../../../../../../shared/src/domain/model/IProduct';
// import { DeleteProductUseCase } from '../../../../application/delete.product.use.case';
// import { GetAllProductsUseCase } from '../../../../application/get.products.use.case';
// import { ProductQuery } from '../../../../domain/state/product.query';
// import { ITableBankAction } from '../../interfaces/ITableBankAction';
// import { DesignOneContainerComponent } from './design.one.container.component';

// describe('DesignOneContainerComponent', () => {
//     let component: DesignOneContainerComponent;
//     let fixture: ComponentFixture<DesignOneContainerComponent>;
//     let getAllProductsUseCase: any;
//     let routerSpy: jasmine.SpyObj<Router>;
//     let deleteProductUseCaseSpy: jasmine.SpyObj<DeleteProductUseCase>;
//     let productQuerySpy: jasmine.SpyObj<ProductQuery>;
//     let el: DebugElement;
//     let httpTestingController: HttpTestingController;
//     let httpClient: HttpClient;

//     const mockProducts: IProduct[] = [
//         { id: '1', name: 'Product 1', description: 'Desc 1', logo: 'logo1.png', date_release: '2024-01-01', date_revision: '2025-01-01' },
//         { id: '2', name: 'Product 2', description: 'Desc 2', logo: 'logo2.png', date_release: '2024-02-01', date_revision: '2025-02-01' }
//     ];

//     const mockActions: ITableBankAction[] = [
//         { label: 'Eliminar', icon: '', onClick: () => { } },
//         { label: 'Editar', icon: '', onClick: () => { } }
//     ];

//     beforeEach(async () => {
//         const mockGetAllProductsUseCase = {
//             execute: jasmine.createSpy('execute').and.returnValue(of(mockProducts))
//         };

//         routerSpy = jasmine.createSpyObj('Router', ['navigate']);
//         deleteProductUseCaseSpy = jasmine.createSpyObj('DeleteProductUseCase', ['execute']);
//         productQuerySpy = jasmine.createSpyObj('ProductQuery', ['selectAll']);
//         productQuerySpy.selectAll.and.returnValue(of(mockProducts));


//         await TestBed.configureTestingModule({
//             imports: [
//                 DesignOneContainerComponent
//             ],
//             providers: [
//                 provideHttpClient(),
//                 provideHttpClientTesting(),
//                 { provide: GetAllProductsUseCase, useValue: mockGetAllProductsUseCase },
//                 { provide: Router, useValue: routerSpy },
//                 { provide: DeleteProductUseCase, useValue: deleteProductUseCaseSpy },
//                 { provide: ProductQuery, useValue: productQuerySpy },
//                 {
//                     provide: ActivatedRoute,
//                     useValue: {
//                         paramMap: of(convertToParamMap({ id: '1' })),
//                         queryParamMap: of(convertToParamMap({})),
//                         snapshot: {
//                             paramMap: convertToParamMap({ id: '1' }),
//                             queryParamMap: convertToParamMap({})
//                         }
//                     }
//                 }
//             ]
//         })
//             .compileComponents();

//         fixture = TestBed.createComponent(DesignOneContainerComponent);
//         component = fixture.componentInstance;
//         el = fixture.debugElement;

//         httpTestingController = TestBed.inject(HttpTestingController);
//         httpClient = TestBed.inject(HttpClient);

//         getAllProductsUseCase = TestBed.inject(GetAllProductsUseCase);
//         fixture.detectChanges();

//         // Initialize component properties after fixture creation and change detection
//         component.data = mockProducts;
//         component.filteredData = [...mockProducts];
//         component.itemsPerPage = 2; // Adjust as needed
//         component.updatePagination();
//     });

//     afterEach(() => {
//         httpTestingController.verify();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should call getAllProductsUseCase.execute on component creation', () => {
//         expect(getAllProductsUseCase.execute).toHaveBeenCalled();
//     });

//     it('should initialize data with products from ProductQuery', () => {
//         expect(component.data).toEqual(mockProducts);
//         expect(component.filteredData).toEqual(mockProducts);
//         expect(component.paginatedData).toEqual(mockProducts.slice(0, component.itemsPerPage)); // Adjust slice based on initial itemsPerPage
//     });

//     it('should set designId from route parameters', () => {
//         expect(component.designId).toBe('1');
//     });

//     describe('searchChange', () => {
//         it('should filter products based on the search term', () => {
//             component.searchChange('Product 1');
//             expect(component.filteredData.length).toBe(1);
//             expect(component.filteredData[0].name).toBe('Product 1');
//         });

//         it('should reset the filtered data when the search term is empty', () => {
//             component.searchChange('Product 1');
//             component.searchChange('');
//             expect(component.filteredData.length).toBe(mockProducts.length);
//         });

//         it('should handle case-insensitive search', () => {
//             component.searchChange('product 1');
//             expect(component.filteredData.length).toBe(1);
//             expect(component.filteredData[0].name).toBe('Product 1');
//         });

//         it('should update paginatedData after filtering', () => {
//             component.searchChange('Product 1');
//             expect(component.paginatedData.length).toBe(1); // Assuming itemsPerPage is greater than or equal to 1
//         });
//     });

//     describe('getPropertyKeyFromHeader', () => {
//         it('should return the correct property key for a given header', () => {
//             expect(component['getPropertyKeyFromHeader']('Logo')).toBe('logo');
//             expect(component['getPropertyKeyFromHeader']('Nombre Producto')).toBe('name');
//             expect(component['getPropertyKeyFromHeader']('Descripción')).toBe('description');
//             expect(component['getPropertyKeyFromHeader']('Fecha de Liberación')).toBe('date_release');
//             expect(component['getPropertyKeyFromHeader']('Fecha de Reestructuración')).toBe('date_revision');
//         });

//         it('should return null for an unknown header', () => {
//             expect(component['getPropertyKeyFromHeader']('Unknown Header')).toBeNull();
//         });
//     });

//     describe('onPageChange', () => {
//         it('should update the current page and update pagination', () => {
//             component.itemsPerPage = 1;
//             component.filteredData = [...mockProducts];
//             component.updatePagination();
//             component.onPageChange(2);
//             expect(component.currentPage).toBe(2);
//             expect(component.paginatedData.length).toBe(1);
//             expect(component.paginatedData[0].name).toBe('Product 2');
//         });
//     });

//     describe('onItemsPerPageChange', () => {
//         it('should update itemsPerPage and reset the current page to 1', () => {
//             component.onItemsPerPageChange(5);
//             expect(component.itemsPerPage).toBe(5);
//             expect(component.currentPage).toBe(1);
//             expect(component.paginatedData.length).toBe(mockProducts.length); // All items should be on the first page
//         });
//     });

//     describe('showCreateModal', () => {
//         it('should navigate to the create route', () => {
//             component.showCreateModal();
//             expect(routerSpy.navigate).toHaveBeenCalledWith(['/create']);
//         });
//     });

//     describe('closeCreateModal', () => {
//         it('should set isModalOpen to false', () => {
//             component.isModalOpen = true;
//             component.closeCreateModal();
//             expect(component.isModalOpen).toBe(false);
//         });
//     });

//     describe('onClick', () => {
//         it('should log the id to the console', () => {
//             spyOn(console, 'log');
//             component.onClick(123);
//             expect(console.log).toHaveBeenCalledWith(123);
//         });
//     });


//     it('should unsubscribe from subscription on ngOnDestroy', () => {
//         spyOn(component['_subscription'], 'unsubscribe');
//         component.ngOnDestroy();
//         expect(component['_subscription'].unsubscribe).toHaveBeenCalled();
//     });

//     it('should update isButtonActive based on designId', () => {
//         const activatedRoute: ActivatedRoute = TestBed.inject(ActivatedRoute);
//         (activatedRoute.paramMap as any).and.returnValue(of(convertToParamMap({ id: '2' }))); // Simulate designId being '2'

//         TestBed.createComponent(DesignOneContainerComponent); // Re-create the component
//         fixture.detectChanges();

//         expect(component.isButtonActive).toBe(false);
//     });

// });