import { IProduct } from "./IProduct";

export interface ICreateProductResponse {
  message: string;
  data: IProduct;
}