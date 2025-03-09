import { inject, Injectable } from '@angular/core';
import { IProduct } from '../../domain/model/IProduct';
import { ProductStore } from '../../domain/state/product.store';

@Injectable({ providedIn: 'root' })
export class ProductStoreService {
  private productStore = inject(ProductStore);

  setProducts(products: IProduct[]): void {
    this.productStore.update({ products });
  }

  setSelectedProduct(product: IProduct): void {
    this.productStore.update({ selectedProduct: product });
  }

  addProduct(product: IProduct): void {
    this.productStore.update(state => ({
      products: [...state.products, product]
    }));
  }

  updateProduct(id: string, updatedProduct: IProduct): void {
    this.productStore.update(state => ({
      products: state.products.map(product =>
        product.id === id ? updatedProduct : product
      )
    }));
  }

  deleteProduct(id: string): void {
    this.productStore.update(state => ({
      products: state.products.filter(product => product.id !== id)
    }));
  }

  setError(error: string): void {
    this.productStore.update({ error });
  }

  setLoading(loading: boolean): void {
    this.productStore.update({ loading });
  }
  
}
