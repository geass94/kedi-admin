import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "../models/product";
import {deserialize, serialize} from "serializer.ts/Serializer";
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${environment.apiUrl}/product/get-products`);
  }

  getColors() {
    return this.http.get(`${environment.apiUrl}/product/get-colors`);
  }

  getCategories() {
    return this.http.get(`${environment.apiUrl}/product/get-categories`);
  }

  getManufacturers() {
    return this.http.get(`${environment.apiUrl}/product/get-manufacturers`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post(`${environment.apiUrl}/product/add-product`, serialize(product))
      .pipe(map((res: any) => deserialize<Product>(Product, res)));
  }
}
