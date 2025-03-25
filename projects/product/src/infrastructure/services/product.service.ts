import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateProductRequest } from '../../../../shared/src/domain/model/ICreateProductRequest';
import { ICreateProductResponse } from '../../../../shared/src/domain/model/ICreateProductResponse';
import { IDeleteProductResponse } from '../../../../shared/src/domain/model/IDeleteProductResponse';
import { IGetProductsResponse } from '../../../../shared/src/domain/model/IGetProductsResponse';
import { IUpdateProductRequest } from '../../../../shared/src/domain/model/IUpdateProductRequest';
import { IUpdateProductResponse } from '../../../../shared/src/domain/model/IUpdateProductResponse';

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
