import {Product} from "./product";

export class Bundle {
  id: number;
  product: Product = new Product();
  products: Product[] = [];
}
