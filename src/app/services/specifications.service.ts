import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Category} from "../models/category";
import {deserialize} from "serializer.ts/Serializer";
import {map} from "rxjs/internal/operators";
import {Color} from "../models/color";
import {Manufacturer} from "../models/manufacturer";

@Injectable({
  providedIn: 'root'
})
export class SpecificationsService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(`${environment.apiUrl}/specification/get-parent-categories`)
      .pipe(map((res: any) => deserialize<Category[]>(Category, res)));
  }

  getAllCategories() {
    return this.http.get(`${environment.apiUrl}/specification/get-categories`)
      .pipe(map((res: any) => deserialize<Category[]>(Category, res)));
  }

  getColors() {
    return this.http.get(`${environment.apiUrl}/specification/get-colors`)
      .pipe(map((res: any) => deserialize<Color[]>(Color, res)));
  }

  getManufacturers() {
    return this.http.get(`${environment.apiUrl}/specification/get-manufacturers`)
      .pipe(map((res: any) => deserialize<Manufacturer[]>(Manufacturer, res)));
  }

  addCategory(category: Category) {
    return this.http.post(`${environment.apiUrl}/admin/specification/add-category`, category)
      .pipe(map((res: any) => deserialize<Category>(Category, res)));
  }

  saveCategory(category: Category, id: number): void {
    this.http.put(`${environment.apiUrl}/admin/specification/save-category/${id}`, category).subscribe();
  }

  deleteCategory(id: number) {
    return this.http.delete(`${environment.apiUrl}/admin/specification/delete-category/${id}`);
  }

  addColor(color: Color) {
    return this.http.post(`${environment.apiUrl}/admin/specification/add-color`, color)
      .pipe(map((res: any) => deserialize<Color>(Color, res)));
  }

  saveColor(color: Color, id: number): void {
    this.http.put(`${environment.apiUrl}/admin/specification/save-color/${id}`, color).subscribe();
  }

  deleteColor(id: number) {
    return this.http.delete(`${environment.apiUrl}/admin/specification/delete-color/${id}`);
  }

  addManufacturer(color: Color) {
    return this.http.post(`${environment.apiUrl}/admin/specification/add-manufacturer`, color)
      .pipe(map((res: any) => deserialize<Color>(Color, res)));
  }

  saveManufacturer(color: Color, id: number): void {
    this.http.put(`${environment.apiUrl}/admin/specification/save-manufacturer/${id}`, color).subscribe();
  }

  deleteManufacturer(id: number) {
    return this.http.delete(`${environment.apiUrl}/admin/specification/delete-manufacturer/${id}`);
  }

}
