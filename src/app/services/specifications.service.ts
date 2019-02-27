import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Category} from "../models/category";
import {deserialize} from "serializer.ts/Serializer";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class SpecificationsService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(`${environment.apiUrl}/product/get-parent-categories`)
      .pipe(map((res: any) => deserialize<Category[]>(Category, res)));
  }

  saveCategory(category: Category, id: number): void {
    this.http.put(`${environment.apiUrl}/product/save-category/${id}`, category).subscribe();
  }

  addCategory(category: Category) {
    return this.http.post(`${environment.apiUrl}/product/add-category`, category)
      .pipe(map((res: any) => deserialize<Category>(Category, res)));
  }
}
