import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, ICreateProductRequest, ICreateProductResponse, IDeleteProductResponse, IGetProductsResponse, IUpdateProductRequest, IUpdateProductResponse } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {

  constructor(private http: HttpClient) {}

  private readonly apiUrl = environment.apiUrl + '/products';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  getAllProducts(): Observable<IGetProductsResponse> {
    return this.http.get<IGetProductsResponse>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  createProduct(
    product: ICreateProductRequest
  ): Observable<ICreateProductResponse> {
    return this.http.post<ICreateProductResponse>(this.apiUrl, product, {
      headers: this.getHeaders(),
    });
  }

  updateProduct(
    id: string,
    product: IUpdateProductRequest
  ): Observable<IUpdateProductResponse> {
    return this.http.put<IUpdateProductResponse>(
      `${this.apiUrl}/${id}`,
      product,
      {
        headers: this.getHeaders(),
      }
    );
  }

  deleteProduct(id: string): Observable<IDeleteProductResponse> {
    return this.http.delete<IDeleteProductResponse>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  productExists(id: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/verification/${id}`,
      {
        headers: this.getHeaders(),
      }
    );
  }
  
}
