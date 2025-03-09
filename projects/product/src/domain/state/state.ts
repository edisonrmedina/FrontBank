import { IProduct } from "../model/IProduct";

export interface ProductState {
    products: IProduct[];
    selectedProduct: IProduct | null;
    loading: boolean;
    error: string | null;
  }
  
  export function createInitialState(): ProductState {
    return {
      products: [],
      selectedProduct: null,
      loading: false,
      error: null,
    };
  }