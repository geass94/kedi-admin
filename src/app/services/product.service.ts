import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "../models/product";
import {deserialize, serialize} from "serializer.ts/Serializer";
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";
import {Category} from "../models/category";
import {Manufacturer} from "../models/manufacturer";
import {Color} from "../models/color";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get(`${environment.apiUrl}/product/get-products`)
      .pipe(map((res: any) => deserialize<Product[]>(Product, res)));
  }

  getColors(): Observable<Color[]> {
    return this.http.get(`${environment.apiUrl}/product/get-colors`)
      .pipe(map((res: any) => deserialize<Color[]>(Color, res)));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get(`${environment.apiUrl}/product/get-categories`)
      .pipe(map((res: any) => deserialize<Category[]>(Category, res)));
  }

  getManufacturers(): Observable<Manufacturer[]> {
    return this.http.get(`${environment.apiUrl}/product/get-manufacturers`)
      .pipe(map((res: any) => deserialize<Manufacturer[]>(Manufacturer, res)));
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post(`${environment.apiUrl}/product/add-product`, serialize(product))
      .pipe(map((res: any) => deserialize<Product>(Product, res)));
  }
}
