import {Bundle} from "./bundle";
import {ProductFile} from "./product-file";

export class Product {
  id: number;
  name: string;
  price: number;
  sale: number;
  quantity: number;
  size: string;
  sex: string;
  description: string
  color: { id: number, name: string };
  manufacturer: { id: number, name: string };
  categoryList: [{ id: number, name: string }];
  productFiles: ProductFile[];
  baseProduct: boolean;
  productVariantId: number;
  productVariantIds: number[];
  promoted: boolean;
  bundle: Bundle;
}
