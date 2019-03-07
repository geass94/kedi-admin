import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "../models/product";
import {deserialize, serialize} from "serializer.ts/Serializer";
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";
import {Category} from "../models/category";
import {Manufacturer} from "../models/manufacturer";
import {Color} from "../models/color";
import {RequestOptions} from "@angular/http";
import {ProductPage} from "../components/products/products.component";
import {Bundle} from "../models/bundle";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(sort: string, order: string, page: number): Observable<ProductPage> {
    let params = new HttpParams();
    params = params.append('sort', sort);
    params = params.append('order', order);
    params = params.append('page', page.toString());
    return this.http.get<ProductPage>(`${environment.apiUrl}/product/get-products`, {params: params});
  }

  getProductsForBundling() {
    return this.http.get<ProductPage>(`${environment.apiUrl}/admin/product/get-products-for-bundling`)
      .pipe(map((res: any) => deserialize<Product[]>(Product, res)));
  }

  addBundle(bundle: Bundle) {
    return this.http.post(`${environment.apiUrl}/admin/product/add-bundle`, serialize(bundle))
      .pipe(map((res: any) => deserialize<Product>(Product, res)));
  }

  getBundles() {

  }

  getCategories() {
    return this.http.get(`${environment.apiUrl}/specification/get-categories`)
      .pipe(map((res: any) => deserialize<Category[]>(Category, res)));
  }

  getProduct(id: any): Observable<Product> {
    return this.http.get(`${environment.apiUrl}/product/get-product-by-id/${id}`)
      .pipe(map((res: any) => deserialize<Product>(Product, res)));
  }

  getProductVariants(ids: any[]): Observable<Product[]> {
    let params = new HttpParams();
    params = params.append('ids', JSON.stringify(ids).replace("[", "").replace("]", ""));
    return this.http.get(`${environment.apiUrl}/product/get-product-variants`, {params: params})
      .pipe(map((res: any) => deserialize<Product[]>(Product, res)));
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post(`${environment.apiUrl}/admin/product/add-product`, serialize(product))
      .pipe(map((res: any) => deserialize<Product>(Product, res)));
  }

  saveProduct(product: Product, id: number) {
    return this.http.put(`${environment.apiUrl}/admin/product/save-product/${id}`, serialize(product))
      .pipe(map((res: any) => deserialize<Product>(Product, res)));
  }

  togglePromotion(product: Product[]) {
    return this.http.post(`${environment.apiUrl}/admin/product/toggle-promotion`, serialize(product))
      .pipe(map((res: any) => deserialize<Product[]>(Product, res)));
  }

  setSale(product: Product[], sale: number) {
    return this.http.post(`${environment.apiUrl}/admin/product/set-sale`, { products: serialize(product), sale: sale } )
      .pipe(map((res: any) => deserialize<Product[]>(Product, res)));
  }

  refillStock(product: Product[], qty: number) {
    return this.http.post(`${environment.apiUrl}/admin/product/refill-stock`, { products: serialize(product), quantity: qty } )
      .pipe(map((res: any) => deserialize<Product[]>(Product, res)));
  }

  deleteFile(fileId: number) {
    return this.http.delete(`${environment.apiUrl}/admin/product/delete-file/${fileId}`);
  }
}
