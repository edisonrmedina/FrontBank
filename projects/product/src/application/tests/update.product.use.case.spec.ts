// import { HttpErrorResponse } from '@angular/common/http';
// import { TestBed } from '@angular/core/testing';
// import { of, throwError } from 'rxjs';
// import { IUpdateProductRequest } from '../../../../shared/src/domain/model/IUpdateProductRequest';
// import { IUpdateProductResponse } from '../../../../shared/src/domain/model/IUpdateProductResponse';
// import { ErrorHandlingService } from '../../infrastructure/services/error.handle.service';
// import { ProductApiService } from '../../infrastructure/services/product.service';
// import { ProductStoreService } from '../../infrastructure/services/product.store.service';
// import { UpdateProductUseCase } from '../update.product.use.case';

// describe('UpdateProductUseCase', () => {
//   let useCase: UpdateProductUseCase;
//   let productApiServiceSpy: jasmine.SpyObj<ProductApiService>;
//   let productStoreServiceSpy: jasmine.SpyObj<ProductStoreService>;
//   let errorHandlingServiceSpy: jasmine.SpyObj<ErrorHandlingService>;

//   beforeEach(() => {
//     const apiSpy = jasmine.createSpyObj('ProductApiService', ['updateProduct']);
//     const storeSpy = jasmine.createSpyObj('ProductStoreService', ['setLoading', 'updateProduct']);
//     const errorSpy = jasmine.createSpyObj('ErrorHandlingService', ['handleError']);

//     TestBed.configureTestingModule({
//       providers: [
//         UpdateProductUseCase,
//         { provide: ProductApiService, useValue: apiSpy },
//         { provide: ProductStoreService, useValue: storeSpy },
//         { provide: ErrorHandlingService, useValue: errorSpy }
//       ]
//     });

//     useCase = TestBed.inject(UpdateProductUseCase);
//     productApiServiceSpy = TestBed.inject(ProductApiService) as jasmine.SpyObj<ProductApiService>;
//     productStoreServiceSpy = TestBed.inject(ProductStoreService) as jasmine.SpyObj<ProductStoreService>;
//     errorHandlingServiceSpy = TestBed.inject(ErrorHandlingService) as jasmine.SpyObj<ErrorHandlingService>;
//   });

//   it('should be created', () => {
//     expect(useCase).toBeTruthy();
//   });

//   it('should set loading to true, update the product, update it in the store, and set loading to false on success', (done) => {
//     // Arrange
//     const productId = 'OPP-QQ';
//     const mockRequest: IUpdateProductRequest = { name: 'Updated Product', description: 'Updated description', logo: 'Updated Logo', date_release: '2024-02-02', date_revision: '2025-02-02' };
//     const mockResponse: IUpdateProductResponse = { data: { id: productId, name: 'Updated Product', description: 'Updated description', logo: 'Updated Logo', date_release: '2024-02-02', date_revision: '2025-02-02' }, message: 'Product updated successfully' };
//     productApiServiceSpy.updateProduct.and.returnValue(of(mockResponse));

//     const callOrder: any[] = [];
//     productStoreServiceSpy.setLoading.and.callFake((loading: boolean) => callOrder.push(`setLoading(${loading})`));
//     productApiServiceSpy.updateProduct.and.callFake(() => { callOrder.push('updateProduct'); return of(mockResponse); });
//     productStoreServiceSpy.updateProduct.and.callFake(() => callOrder.push('storeUpdateProduct'));

//     // Act
//     useCase.execute(productId, mockRequest).subscribe(() => {
//       // Assert
//       expect(callOrder).toEqual([
//         'setLoading(true)',
//         'updateProduct',
//         'storeUpdateProduct',
//         'setLoading(false)'
//       ]);
//       done();
//     });
//   });

//   it('should handle error when API call fails and set loading to false', (done) => {
//     // Arrange
//     const productId = 'OPP-QQ';
//     const mockRequest: IUpdateProductRequest = { name: 'Updated Product', description: 'Updated description', logo: 'Updated Logo', date_release: '2024-02-02', date_revision: '2025-02-02' };
//     const mockError = new HttpErrorResponse({
//       error: 'API Error',
//       status: 500,
//       statusText: 'Internal Server Error'
//     });
//     productApiServiceSpy.updateProduct.and.returnValue(throwError(() => mockError));
//     errorHandlingServiceSpy.handleError.and.returnValue(throwError(() => mockError));

//      //Spy on console.error
//      spyOn(console, 'error');

//     const callOrder: any[] = [];
//     productStoreServiceSpy.setLoading.and.callFake((loading: boolean) => callOrder.push(`setLoading(${loading})`));
//     productApiServiceSpy.updateProduct.and.callFake(() => { callOrder.push('updateProduct'); return throwError(() => mockError); });
    

//     // Act
//     useCase.execute(productId, mockRequest).subscribe({
//       next: () => {
//         fail('Expected an error, but got a value');
//         done();
//       },
//       error: (error) => {
//         expect(callOrder).toEqual([
//           'setLoading(true)',
//           'updateProduct',
//           'handleError',
//           'setLoading(false)'
//         ]);
//         expect(error).toEqual(mockError);
//         expect(console.error).toHaveBeenCalled();
//         done();
//       },
//       complete: () => {
//         fail('Expected an error, but got complete');
//         done();
//       }
//     });
//   });
// });