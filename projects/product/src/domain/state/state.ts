import { IProductState } from "../model/iProductState";

export function createInitialState(): IProductState {
    return {
      products: [],
      selectedProduct: null,
      loading: false,
      error: null,
      translations: {},
    };
  }