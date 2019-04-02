import {Bundle} from "./bundle";
import {ProductFile} from "./product-file";
import {Category} from "./category";
import {Size} from "./size";
import {Color} from "./color";
import {Manufacturer} from "./manufacturer";

export class Product {
  id: number;
  name: string;
  referenceCode: string;
  barCode: string;
  price: number;
  quantity: number;
  totalQuantity: number;
  sale: number;
  description: string;
  promoted: boolean;
  countDown: string;
  //  Specifications
  color: Color;
  size: Size;
  sex: string;
  manufacturer: Manufacturer;
  categoryList: Category[];
  //  File attachments
  productFiles: ProductFile[];
  //  Product Variants
  baseProduct: boolean;
  baseVariant: Product;
  variants: Product[];
  //  Bundles and gifts
  bundledProducts: Product[];
  makeBundle: boolean;
}
