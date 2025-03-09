import { IProduct } from "./IProduct";

export interface IUpdateProductRequest extends Pick<IProduct, "name" | "description" | "logo" | "date_release" | "date_revision"> {}
