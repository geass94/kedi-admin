import {Bundle} from "./bundle";
import {ProductFile} from "./product-file";
import {Category} from "./category";

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
  categoryList: Category[];
  productFiles: ProductFile[];
  baseProduct: boolean;
  productVariantId: number;
  productVariantIds: number[];
  promoted: boolean;
  bundle: Bundle;
  countDown: string;
}
