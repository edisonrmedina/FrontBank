// import {
//     HttpClientTestingModule,
//     HttpTestingController,
// } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import { ICreateProductRequest } from '../../../../../shared/src/domain/model/ICreateProductRequest';
// import { ICreateProductResponse } from '../../../../../shared/src/domain/model/ICreateProductResponse';
// import { IDeleteProductResponse } from '../../../../../shared/src/domain/model/IDeleteProductResponse';
// import { IGetProductsResponse } from '../../../../../shared/src/domain/model/IGetProductsResponse';
// import { IUpdateProductRequest } from '../../../../../shared/src/domain/model/IUpdateProductRequest';
// import { IUpdateProductResponse } from '../../../../../shared/src/domain/model/IUpdateProductResponse';
// import { ProductApiService } from '../product.service';

// describe('ProductApiService', () => {
//   let service: ProductApiService;
//   let httpMock: HttpTestingController;
//   const apiUrl = 'http://localhost:3002/bp/products';

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [ProductApiService],
//     });

//     service = TestBed.inject(ProductApiService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify(); // Verifies that no requests are outstanding
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   describe('getAllProducts', () => {
//     it('should make a GET request to fetch all products with correct headers', () => {
//       const mockResponse: IGetProductsResponse = {
//         data : [
//             {id: '1',
//             name: 'Product 1',
//             description: 'Description 1',
//             logo: 'logo1.png',
//             date_release: '2023-01-01',
//             date_revision: '2024-01-01',
//           },
//           {
//             id: '2',
//             name: 'Product 2',
//             description: 'Description 2',
//             logo: 'logo2.png',
//             date_release: '2023-02-01',
//             date_revision: '2024-02-01',
//           },
//         ]
//       }

//       service.getAllProducts().subscribe((response) => {
//         expect(response).toEqual(mockResponse);
//       });

//       const req = httpMock.expectOne(apiUrl);
//       expect(req.request.method).toBe('GET');
//       expect(req.request.headers.get('Content-Type')).toBe('application/json');
//       expect(req.request.headers.get('Accept')).toBe('application/json');
//       req.flush(mockResponse);
//     });
//   });

//   describe('createProduct', () => {
//     it('should make a POST request to create a product with correct data and headers', () => {
//       const mockRequest: ICreateProductRequest = {
//         id: '3',
//         name: 'Product 3',
//         description: 'Description 3',
//         logo: 'logo3.png',
//         date_release: '2023-03-01',
//         date_revision: '2024-03-01',
//       };

//       const mockResponse: ICreateProductResponse = {
//         data: {
//           id: '3',
//           name: 'Product 3',
//           description: 'Description 3',
//           logo: 'logo3.png',
//           date_release: '2023-03-01',
//           date_revision: '2024-03-01',
//         },
//         message: 'Product created successfully',
//       };

//       service.createProduct(mockRequest).subscribe((response) => {
//         expect(response).toEqual(mockResponse);
//       });

//       const req = httpMock.expectOne(apiUrl);
//       expect(req.request.method).toBe('POST');
//       expect(req.request.body).toEqual(mockRequest);
//       expect(req.request.headers.get('Content-Type')).toBe('application/json');
//       expect(req.request.headers.get('Accept')).toBe('application/json');
//       req.flush(mockResponse);
//     });
//   });

//   describe('updateProduct', () => {
//     it('should make a PUT request to update a product with correct ID, data, and headers', () => {
//       const productId = '2';
//       const mockRequest: IUpdateProductRequest = {
//         name: 'Updated Product 2',
//         description: 'Updated Description 2',
//         logo: 'updated-logo2.png',
//         date_release: '2023-02-01',
//         date_revision: '2024-04-01',
//       };

//       const mockResponse: IUpdateProductResponse = {
//         data: {
//           id: '2',
//           name: 'Updated Product 2',
//           description: 'Updated Description 2',
//           logo: 'updated-logo2.png',
//           date_release: '2023-02-01',
//           date_revision: '2024-04-01',
//         },
//         message: 'Product updated successfully',
//       };

//       service.updateProduct(productId, mockRequest).subscribe((response) => {
//         expect(response).toEqual(mockResponse);
//       });

//       const req = httpMock.expectOne(`${apiUrl}/${productId}`);
//       expect(req.request.method).toBe('PUT');
//       expect(req.request.body).toEqual(mockRequest);
//       expect(req.request.headers.get('Content-Type')).toBe('application/json');
//       expect(req.request.headers.get('Accept')).toBe('application/json');
//       req.flush(mockResponse);
//     });
//   });

//   describe('deleteProduct', () => {
//     it('should make a DELETE request to remove a product with correct ID and headers', () => {
//       const productId = '2';
//       const mockResponse: IDeleteProductResponse = {
//         message: 'Product deleted successfully',
//       };

//       service.deleteProduct(productId).subscribe((response) => {
//         expect(response).toEqual(mockResponse);
//       });

//       const req = httpMock.expectOne(`${apiUrl}/${productId}`);
//       expect(req.request.method).toBe('DELETE');
//       expect(req.request.headers.get('Content-Type')).toBe('application/json');
//       expect(req.request.headers.get('Accept')).toBe('application/json');
//       req.flush(mockResponse);
//     });
//   });

//   describe('productExists', () => {
//     it('should make a GET request to verify if a product exists with correct ID and headers', () => {
//       const productId = '1';
//       const mockResponse: boolean =false;

//       service.productExists(productId).subscribe((response) => {
//         expect(response).toEqual(mockResponse);
//       });

//       const req = httpMock.expectOne(`${apiUrl}/verification/${productId}`);
//       expect(req.request.method).toBe('GET');
//       expect(req.request.headers.get('Content-Type')).toBe('application/json');
//       expect(req.request.headers.get('Accept')).toBe('application/json');
//       req.flush(mockResponse);
//     });
//   });

//   describe('getHeaders', () => {
//     it('should return the correct HTTP headers', () => {
//       // We need to test the private method indirectly through a public method
//       service.getAllProducts().subscribe();

//       const req = httpMock.expectOne(apiUrl);
//       expect(req.request.headers.get('Content-Type')).toBe('application/json');
//       expect(req.request.headers.get('Accept')).toBe('application/json');
//       req.flush([]);
//     });
//   });

//   describe('error handling', () => {
//     it('should propagate HTTP errors when getAllProducts fails', () => {
//       const errorResponse = { status: 500, statusText: 'Server Error' };

//       let actualError: any;
//       service.getAllProducts().subscribe({
//         next: () => fail('Expected an error, not data'),
//         error: (error) => (actualError = error),
//       });

//       const req = httpMock.expectOne(apiUrl);
//       req.flush('Server error', errorResponse);

//       expect(actualError.status).toBe(500);
//     });

//     it('should propagate HTTP errors when createProduct fails', () => {
//       const errorResponse = { status: 400, statusText: 'Bad Request' };
//       const mockRequest: ICreateProductRequest = {
//         id: '3',
//         name: 'Product 3',
//         description: 'Description 3',
//         logo: 'logo3.png',
//         date_release: '2023-03-01',
//         date_revision: '2024-03-01',
//       };

//       let actualError: any;
//       service.createProduct(mockRequest).subscribe({
//         next: () => fail('Expected an error, not data'),
//         error: (error) => (actualError = error),
//       });

//       const req = httpMock.expectOne(apiUrl);
//       req.flush('Invalid data', errorResponse);

//       expect(actualError.status).toBe(400);
//     });
//   });
// });
