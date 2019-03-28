import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Category} from "../models/category";
import {deserialize} from "serializer.ts/Serializer";
import {map} from "rxjs/internal/operators";
import {Color} from "../models/color";
import {Manufacturer} from "../models/manufacturer";
import {Size} from "../models/size";

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

  getSizes() {
    return this.http.get(`${environment.apiUrl}/specification/get-sizes`)
      .pipe(map((res: any) => deserialize<Size[]>(Size, res)));
  }
  // CATEGORY
  addCategory(data: Category) {
    return this.http.post(`${environment.apiUrl}/admin/specification/add-category`, data)
      .pipe(map((res: any) => deserialize<Category>(Category, res)));
  }

  saveCategory(data: Category, id: number) {
    return this.http.put(`${environment.apiUrl}/admin/specification/save-category/${id}`, data);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${environment.apiUrl}/admin/specification/delete-category/${id}`);
  }
  // COLOR
  addColor(data: Color) {
    return this.http.post(`${environment.apiUrl}/admin/specification/add-color`, data)
      .pipe(map((res: any) => deserialize<Color>(Color, res)));
  }

  saveColor(data: Color, id: number) {
    return this.http.put(`${environment.apiUrl}/admin/specification/save-color/${id}`, data);
  }

  deleteColor(id: number) {
    return this.http.delete(`${environment.apiUrl}/admin/specification/delete-color/${id}`);
  }
  // MANFACTURER
  addManufacturer(data: Manufacturer) {
    return this.http.post(`${environment.apiUrl}/admin/specification/add-manufacturer`, data)
      .pipe(map((res: any) => deserialize<Manufacturer>(Manufacturer, res)));
  }

  saveManufacturer(data: Manufacturer, id: number) {
    return this.http.put(`${environment.apiUrl}/admin/specification/save-manufacturer/${id}`, data);
  }

  deleteManufacturer(id: number) {
    return this.http.delete(`${environment.apiUrl}/admin/specification/delete-manufacturer/${id}`);
  }
  // SIZE
  addSize(data: Size) {
    return this.http.post(`${environment.apiUrl}/admin/specification/add-size`, data)
      .pipe(map((res: any) => deserialize<Size>(Size, res)));
  }

  saveSize(data: Size, id: number) {
    return this.http.put(`${environment.apiUrl}/admin/specification/save-size/${id}`, data);
  }

  deleteSize(id: number) {
    return this.http.delete(`${environment.apiUrl}/admin/specification/delete-size/${id}`);
  }

}
