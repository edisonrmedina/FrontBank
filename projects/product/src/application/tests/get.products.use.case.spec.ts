// import { TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';
// import { IProduct } from '../../../../shared/src/domain/model/IProduct';
// import { ProductQuery } from '../../domain/state/product.query';
// import { ErrorHandlingService } from '../../infrastructure/services/error.handle.service';
// import { ProductApiService } from '../../infrastructure/services/product.service';
// import { ProductStoreService } from '../../infrastructure/services/product.store.service';
// import { GetAllProductsUseCase } from '../get.products.use.case';


// describe('GetAllProductsUseCase', () => {
//   let useCase: GetAllProductsUseCase;
//   let productApiServiceSpy: jasmine.SpyObj<ProductApiService>;
//   let productStoreServiceSpy: jasmine.SpyObj<ProductStoreService>;
//   let productQuerySpy: jasmine.SpyObj<ProductQuery>;
//   let errorHandlingServiceSpy: jasmine.SpyObj<ErrorHandlingService>;

//   beforeEach(() => {
//     // Create spy objects for all dependencies
//     const apiSpy = jasmine.createSpyObj('ProductApiService', ['getAllProducts']);
//     const storeSpy = jasmine.createSpyObj('ProductStoreService', ['setLoading', 'setProducts']);
//     const querySpy = jasmine.createSpyObj('ProductQuery', ['selectAll']);
//     const errorSpy = jasmine.createSpyObj('ErrorHandlingService', ['handleError']);

//     TestBed.configureTestingModule({
//       providers: [
//         GetAllProductsUseCase,
//         { provide: ProductApiService, useValue: apiSpy },
//         { provide: ProductStoreService, useValue: storeSpy },
//         { provide: ProductQuery, useValue: querySpy },
//         { provide: ErrorHandlingService, useValue: errorSpy }
//       ]
//     });

//     // Get the use case and spy objects
//     useCase = TestBed.inject(GetAllProductsUseCase);
//     productApiServiceSpy = TestBed.inject(ProductApiService) as jasmine.SpyObj<ProductApiService>;
//     productStoreServiceSpy = TestBed.inject(ProductStoreService) as jasmine.SpyObj<ProductStoreService>;
//     productQuerySpy = TestBed.inject(ProductQuery) as jasmine.SpyObj<ProductQuery>;
//     errorHandlingServiceSpy = TestBed.inject(ErrorHandlingService) as jasmine.SpyObj<ErrorHandlingService>;
//   });

//   it('should be created', () => {
//     expect(useCase).toBeTruthy();
//   });

//   it('should return products from the query', () => {
//     // Arrange
//     const mockProducts: IProduct[] = [{ id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1', date_release: '2024-01-01', date_revision: '2025-01-01' }, { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2', date_release: '2024-02-01', date_revision: '2025-02-01' }];
//     productQuerySpy.selectAll.and.returnValue(of(mockProducts));

//     // Act
//     useCase.products$().subscribe(products => {
//       // Assert
//       expect(products).toEqual(mockProducts);
//     });
//   });

//   it('should set loading to true, get products from API, set products in store, and set loading to false on success', () => {
//     // Arrange
//     const mockProducts: IProduct[] = [{ id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1', date_release: '2024-01-01', date_revision: '2025-01-01' }, { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2', date_release: '2024-02-01', date_revision: '2025-02-01' }];
//     const mockResponse = { data: mockProducts };
//     productApiServiceSpy.getAllProducts.and.returnValue(of(mockResponse));

//     // Act
//     useCase.execute();

//     // Assert
//     expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(true);
//     expect(productApiServiceSpy.getAllProducts).toHaveBeenCalled();
//     expect(productStoreServiceSpy.setProducts).toHaveBeenCalledWith(mockProducts);
//     expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(false);
//   });

// //   it('should handle error when API call fails and set loading to false', (done) => {
// //     // Arrange
// //     const mockError = new HttpErrorResponse({
// //       error: 'API Error',
// //       status: 500,
// //       statusText: 'Internal Server Error'
// //     });

// //     const mockErrorMessage: any = { // Define mockErrorMessage
// //       code: 'SERVER_ERROR_500',
// //       message: 'Server error. Please try again later.',
// //       details: 'API Error',
// //       originalError: 'API Error',
// //     };

// //     productApiServiceSpy.getAllProducts.and.returnValue(throwError(() => mockError)); // Simulate the API error
// //     errorHandlingServiceSpy.handleError.and.returnValue(throwError(() => mockErrorMessage));
// //     productQuerySpy.selectAll.and.returnValue(of([]));  // Add this line: Mock ProductQuery to return a default value


// //     // Act
// //     useCase.execute();

// //     // Assert
// //     expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(true);
// //     expect(productApiServiceSpy.getAllProducts).toHaveBeenCalled();
// //     expect(errorHandlingServiceSpy.handleError).toHaveBeenCalled();
  
// //     useCase.products$ =  of([]);

// //     useCase.products$().subscribe({
// //       next: () => {
// //         fail('Expected error, but got next');
// //         done();
// //       },
// //       error: (error) => {
// //         expect(error).toEqual(mockErrorMessage);
// //         expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(false);
// //         done();
// //       },
// //       complete: () => {
// //         fail('Expected error, but got complete');
// //         done();
// //       }
// //     });
// //   });
// });