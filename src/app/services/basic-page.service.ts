import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BasicPage} from "../models/basic-page";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BasicPageService {

  constructor(private http: HttpClient) { }

  addPage(data: BasicPage) {
    return this.http.post(`${environment.apiUrl}/admin/page/add-page`, data);
  }

  getPage(alias: string) {
    return this.http.get(`${environment.apiUrl}/basic-page/${alias}`);
  }

  savePage(data: BasicPage, id: number) {
    return this.http.put(`${environment.apiUrl}/admin/page/save-page/${id}`, data);
  }
}
