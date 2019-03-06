import {Bundle} from "./bundle";

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
  productFiles: [ { id: number, name: string, fileType: string, fileUrl: string } ];
  baseProduct: boolean;
  productVariantId: number;
  productVariantIds: number[];
  promoted: boolean;
  bundle: Bundle;
}
