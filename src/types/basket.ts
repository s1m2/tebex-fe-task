import type { Product } from "./product";

export type Basket = {
  id: string;
  products: Product[];
  couponCode: string | null;
  subTotal: number;
  salesTax: number;
  total: number;
}