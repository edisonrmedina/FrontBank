import { IProduct } from "./IProduct";

export interface IProductState {
    products: IProduct[];
    selectedProduct: IProduct | null;
    loading: boolean;
    error: string | null;
    translations: { [key: string]: string };
  } 