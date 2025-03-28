// import { HttpErrorResponse } from '@angular/common/http';
// import { TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { IErrorMessage } from '../../../../../shared/src/domain/model/error.mesage';
// import { ErrorHandlingService } from '../error.handle.service';
// import { ProductStoreService } from '../product.store.service';


// describe('ErrorHandlingService', () => {
//   let service: ErrorHandlingService;
//   let productStoreServiceSpy: jasmine.SpyObj<ProductStoreService>;

//   beforeEach(() => {
//     // Create a spy for the ProductStoreService
//     const spy = jasmine.createSpyObj('ProductStoreService', ['setError', 'setLoading']);

//     TestBed.configureTestingModule({
//       providers: [
//         ErrorHandlingService,
//         { provide: ProductStoreService, useValue: spy }
//       ]
//     });

//     service = TestBed.inject(ErrorHandlingService);
//     productStoreServiceSpy = TestBed.inject(ProductStoreService) as jasmine.SpyObj<ProductStoreService>;
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   describe('handleError', () => {
//     it('should handle client-side errors', () => {
//       // Create a client-side error
//       const errorEvent = new ErrorEvent('Client Error', { message: 'Network error' });
//       const httpError = new HttpErrorResponse({
//         error: errorEvent,
//         status: 0,
//         statusText: 'Client Error'
//       });

//       const operation = 'fetchProducts';
//       let caughtError: IErrorMessage | undefined;

//       service.handleError(httpError, operation)
//         .pipe(
//           catchError(err => {
//             caughtError = err;
//             return of(null);
//           })
//         )
//         .subscribe();

//       expect(caughtError).toBeDefined();
//       if (caughtError) {
//         expect(caughtError.code).toBe('CLIENT_ERROR');
//         expect(caughtError.message).toBe('Client error');
//         expect(caughtError.details).toContain(operation);
//         expect(caughtError.details).toContain('Network error');
//       }

//       expect(productStoreServiceSpy.setError).toHaveBeenCalledWith('Client error');
//       expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(false);
//     });

//     it('should handle server-side errors with NotFoundError name', () => {
//       const errorBody = {
//         name: 'NotFoundError',
//         message: 'Product with ID XYZ was not found'
//       };

//       const httpError = new HttpErrorResponse({
//         error: errorBody,
//         status: 404,
//         statusText: 'Not Found'
//       });

//       const operation = 'getProduct';
//       let caughtError: IErrorMessage | undefined;

//       service.handleError(httpError, operation)
//         .pipe(
//           catchError(err => {
//             caughtError = err;
//             return of(null);
//           })
//         )
//         .subscribe();

//       expect(caughtError).toBeDefined();
//       if (caughtError) {
//         expect(caughtError.code).toBe('NOT_FOUND');
//         expect(caughtError.message).toBe('The product was not found.');
//         expect(caughtError.details).toBe('Product with ID XYZ was not found');
//         expect(caughtError.originalError).toEqual(errorBody);
//       }

//       expect(productStoreServiceSpy.setError).toHaveBeenCalledWith('The product was not found.');
//       expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(false);
//     });

//     it('should handle server-side errors with ValidationError name', () => {
//       const errorBody = {
//         name: 'ValidationError',
//         message: 'Invalid product data'
//       };

//       const httpError = new HttpErrorResponse({
//         error: errorBody,
//         status: 400,
//         statusText: 'Bad Request'
//       });

//       const operation = 'createProduct';
//       let caughtError: IErrorMessage | undefined;

//       service.handleError(httpError, operation)
//         .pipe(
//           catchError(err => {
//             caughtError = err;
//             return of(null);
//           })
//         )
//         .subscribe();

//       expect(caughtError).toBeDefined();
//       if (caughtError) {
//         expect(caughtError.code).toBe('VALIDATION_ERROR');
//         expect(caughtError.message).toBe('Validation error. Please check the entered data.');
//         expect(caughtError.details).toBe('Invalid product data');
//         expect(caughtError.originalError).toEqual(errorBody);
//       }

//       expect(productStoreServiceSpy.setError).toHaveBeenCalledWith('Validation error. Please check the entered data.');
//       expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(false);
//     });

//     it('should handle server-side errors with DuplicateError name', () => {
//       const errorBody = {
//         name: 'DuplicateError',
//         message: 'Product with ID ABC already exists'
//       };

//       const httpError = new HttpErrorResponse({
//         error: errorBody,
//         status: 409,
//         statusText: 'Conflict'
//       });

//       const operation = 'createProduct';
//       let caughtError: IErrorMessage | undefined;

//       service.handleError(httpError, operation)
//         .pipe(
//           catchError(err => {
//             caughtError = err;
//             return of(null);
//           })
//         )
//         .subscribe();

//       expect(caughtError).toBeDefined();
//       if (caughtError) {
//         expect(caughtError.code).toBe('DUPLICATE_ERROR');
//         expect(caughtError.message).toBe('This product already exists in the system.');
//         expect(caughtError.details).toBe('Product with ID ABC already exists');
//         expect(caughtError.originalError).toEqual(errorBody);
//       }

//       expect(productStoreServiceSpy.setError).toHaveBeenCalledWith('This product already exists in the system.');
//       expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(false);
//     });

//     it('should handle 400 status code error', () => {
//       const httpError = new HttpErrorResponse({
//         error: { message: 'Invalid request parameters' },
//         status: 400,
//         statusText: 'Bad Request'
//       });

//       const operation = 'createProduct';
//       let caughtError: IErrorMessage | undefined;

//       service.handleError(httpError, operation)
//         .pipe(
//           catchError(err => {
//             caughtError = err;
//             return of(null);
//           })
//         )
//         .subscribe();

//       expect(caughtError).toBeDefined();
//       if (caughtError) {
//         expect(caughtError.code).toBe('SERVER_ERROR_400');
//         expect(caughtError.message).toBe('Bad request. Please check the data.');
//         expect(caughtError.details).toBe('Invalid request parameters');
//       }

//       expect(productStoreServiceSpy.setError).toHaveBeenCalledWith('Bad request. Please check the data.');
//       expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(false);
//     });

//     it('should handle 401 status code error', () => {
//       const httpError = new HttpErrorResponse({
//         error: { message: 'Unauthorized access' },
//         status: 401,
//         statusText: 'Unauthorized'
//       });

//       const operation = 'getProducts';
//       let caughtError: IErrorMessage | undefined;

//       service.handleError(httpError, operation)
//         .pipe(
//           catchError(err => {
//             caughtError = err;
//             return of(null);
//           })
//         )
//         .subscribe();

//       expect(caughtError).toBeDefined();
//       if (caughtError) {
//         expect(caughtError.code).toBe('SERVER_ERROR_401');
//         expect(caughtError.message).toBe('Unauthorized. Please log in again.');
//       }

//       expect(productStoreServiceSpy.setError).toHaveBeenCalledWith('Unauthorized. Please log in again.');
//       expect(productStoreServiceSpy.setLoading).toHaveBeenCalledWith(false);
//     });

//     it('should handle 403 status code error', () => {
//       const httpError = new HttpErrorResponse({
//         error: { message: 'Forbidden' },
//         status: 403,
//         statusText: 'Forbidden'
//       });

//       let caughtError: IErrorMessage | undefined;

//       service.handleError(httpError, 'deleteProduct')
//         .pipe(
//           catchError(err => {
//             caughtError = err;
//             return of(null);
//           })
//         )
//         .subscribe();

//       expect(caughtError?.message).toBe('Access denied. You do not have permission for this action.');
//       expect(productStoreServiceSpy.setError).toHaveBeenCalledWith('Access denied. You do not have permission for this action.');
//     });

//     it('should handle 404 status code error', () => {
//       const httpError = new HttpErrorResponse({
//         error: { message: 'Product not found' },
//         status: 404,
//         statusText: 'Not Found'
//       });

//       let caughtError: IErrorMessage | undefined;

//       service.handleError(httpError, 'getProduct')
//         .pipe(
//           catchError(err => {
//             caughtError = err;
//             return of(null);
//           })
//         )
//         .subscribe();

//       expect(caughtError?.message).toBe('Resource not found.');
//       expect(productStoreServiceSpy.setError).toHaveBeenCalledWith('Resource not found.');
//     });

//     it('should handle 409 status code error', () => {
//       const httpError = new HttpErrorResponse({
//         error: { message: 'Product already exists' },
//         status: 409,
//         statusText: 'Conflict'
//       });

//       let caughtError: IErrorMessage | undefined;

//       service.handleError(httpError, 'createProduct')
//         .pipe(
//           catchError(err => {
//             caughtError = err;
//             return of(null);
//           })
//         )
//         .subscribe();

//       expect(caughtError?.message).toBe('Conflict with the current state of the resource.');
//       expect(productStoreServiceSpy.setError).toHaveBeenCalledWith('Conflict with the current state of the resource.');
//     });

//     it('should handle 500 status code error', () => {
//       const httpError = new HttpErrorResponse({
//         error: { message: 'Internal server error' },
//         status: 500,
//         statusText: 'Internal Server Error'
//       });

//       let caughtError: IErrorMessage | undefined;

//       service.handleError(httpError, 'updateProduct')
//         .pipe(
//           catchError(err => {
//             caughtError = err;
//             return of(null);
//           })
//         )
//         .subscribe();

//       expect(caughtError?.message).toBe('Server error. Please try again later.');
//       expect(productStoreServiceSpy.setError).toHaveBeenCalledWith('Server error. Please try again later.');
//     });

//     it('should handle unknown status code errors', () => {
//       const httpError = new HttpErrorResponse({
//         error: { message: 'Some unusual error' },
//         status: 503,
//         statusText: 'Service Unavailable'
//       });

//       let caughtError: IErrorMessage | undefined;

//       service.handleError(httpError, 'getProducts')
//         .pipe(
//           catchError(err => {
//             caughtError = err;
//             return of(null);
//           })
//         )
//         .subscribe();

//       expect(caughtError?.message).toBe('Unknown error. Please try again later.');
//       expect(productStoreServiceSpy.setError).toHaveBeenCalledWith('Unknown error. Please try again later.');
//     });

//     it('should handle server errors with missing error body', () => {
//       const httpError = new HttpErrorResponse({
//         status: 500,
//         statusText: 'Internal Server Error',
//         error: null
//       });

//       let caughtError: IErrorMessage | undefined;

//       service.handleError(httpError, 'getProducts')
//         .pipe(
//           catchError(err => {
//             caughtError = err;
//             return of(null);
//           })
//         )
//         .subscribe();

//       expect(caughtError?.message).toBe('Server error. Please try again later.');
//       expect(caughtError?.details).toBe('Http failure response for (unknown url): 500 Internal Server Error');
//     });
//   });

//   describe('clearError', () => {
//     it('should clear error state in product store', () => {
//       service.clearError();
//       expect(productStoreServiceSpy.setError).toHaveBeenCalledWith('');
//     });
//   });
// });