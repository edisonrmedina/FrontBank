import { IProductState } from "../model/IProductState";

export function createInitialState(): IProductState {
    return {
      products: [],
      selectedProduct: null,
      loading: false,
      error: null,
      currentLanguage:'en',
      translations: {},
    };
}