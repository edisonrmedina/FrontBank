import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateProductRequest } from '../../domain/model/ICreateProductRequest';
import { ICreateProductResponse } from '../../domain/model/ICreateProductResponse';
import { IDeleteProductResponse } from '../../domain/model/IDeleteProductResponse';
import { IGetProductsResponse } from '../../domain/model/IGetProductsResponse';
import { IProductExistsResponse } from '../../domain/model/IProductExistsResponse';
import { IUpdateProductRequest } from '../../domain/model/IUpdateProductRequest';
import { IUpdateProductResponse } from '../../domain/model/IUpdateProductResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private readonly apiUrl = 'http://localhost:3002/bp/products';

  constructor(private http: HttpClient) {}

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
    debugger;
    return this.http.delete<IDeleteProductResponse>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  productExists(id: string): Observable<IProductExistsResponse> {
    return this.http.get<IProductExistsResponse>(
      `${this.apiUrl}/verification/${id}`,
      {
        headers: this.getHeaders(),
      }
    );
  }
  
}
