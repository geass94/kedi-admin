import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BasicPage, BasicPagePage} from "../models/basic-page";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/index";

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

  getPages(sort: string, order: string, page: number): Observable<BasicPagePage> {
    let params = new HttpParams();
    params = params.append('sort', sort);
    params = params.append('order', order);
    params = params.append('page', page.toString());
    return this.http.get<BasicPagePage>(`${environment.apiUrl}/admin/page/get-all`, {params: params});
  }

  savePage(data: BasicPage, id: number) {
    return this.http.put(`${environment.apiUrl}/admin/page/save-page/${id}`, data);
  }
}
