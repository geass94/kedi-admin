import {Product} from "./product";

export class Bundle {
  id: number;
  parent: Product;
  products: Product[];
  price: number;
  sale: number;
}
