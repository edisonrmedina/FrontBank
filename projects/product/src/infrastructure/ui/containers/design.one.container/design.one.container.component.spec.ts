import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { DeleteProductUseCase } from '../../../../application/delete.product.use.case';
import { GetAllProductsUseCase } from '../../../../application/get.products.use.case';
import { IProduct } from '../../../../domain/model/IProduct';
import { ProductQuery } from '../../../../domain/state/product.query';
import { ITableBankAction } from '../../interfaces/ITableBankAction';
import { DesignOneContainerComponent } from './design.one.container.component';

describe('DesignOneContainerComponent', () => {
    let component: DesignOneContainerComponent;
    let fixture: ComponentFixture<DesignOneContainerComponent>;
    let getAllProductsUseCase: any;
    let routerSpy: jasmine.SpyObj<Router>;
    let deleteProductUseCaseSpy: jasmine.SpyObj<DeleteProductUseCase>;
    let productQuerySpy: jasmine.SpyObj<ProductQuery>;
    let el: DebugElement;
    let httpTestingController: HttpTestingController;
    let httpClient: HttpClient;

    const mockProducts: IProduct[] = [
        { id: '1', name: 'Product 1', description: 'Desc 1', logo: 'logo1.png', date_release: '2024-01-01', date_revision: '2025-01-01' },
        { id: '2', name: 'Product 2', description: 'Desc 2', logo: 'logo2.png', date_release: '2024-02-01', date_revision: '2025-02-01' }
    ];

    const mockActions: ITableBankAction[] = [
        { label: 'Eliminar', icon: '', onClick: () => { } },
        { label: 'Editar', icon: '', onClick: () => { } }
    ];

    beforeEach(async () => {
        const mockGetAllProductsUseCase = {
            execute: jasmine.createSpy('execute').and.returnValue(of(mockProducts))
        };

        routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        deleteProductUseCaseSpy = jasmine.createSpyObj('DeleteProductUseCase', ['execute']);
        productQuerySpy = jasmine.createSpyObj('ProductQuery', ['selectAll']);
        productQuerySpy.selectAll.and.returnValue(of(mockProducts));


        await TestBed.configureTestingModule({
            imports: [
                DesignOneContainerComponent
            ],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: GetAllProductsUseCase, useValue: mockGetAllProductsUseCase },
                { provide: Router, useValue: routerSpy },
                { provide: DeleteProductUseCase, useValue: deleteProductUseCaseSpy },
                { provide: ProductQuery, useValue: productQuerySpy },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of(convertToParamMap({ id: '1' })),
                        queryParamMap: of(convertToParamMap({})),
                        snapshot: {
                            paramMap: convertToParamMap({ id: '1' }),
                            queryParamMap: convertToParamMap({})
                        }
                    }
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DesignOneContainerComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        httpTestingController = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);

        getAllProductsUseCase = TestBed.inject(GetAllProductsUseCase);
        fixture.detectChanges();

        // Initialize component properties after fixture creation and change detection
        component.data = mockProducts;
        component.filteredData = [...mockProducts];
        component.itemsPerPage = 2; // Adjust as needed
        component.updatePagination();
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });



});