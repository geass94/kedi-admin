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


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get(`${environment.apiUrl}/product/get-products`)
      .pipe(map((res: any) => deserialize<Product[]>(Product, res)));
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
    return this.http.post(`${environment.apiUrl}/product/add-product`, serialize(product))
      .pipe(map((res: any) => deserialize<Product>(Product, res)));
  }
}
