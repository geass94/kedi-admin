import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {environment} from "../../environments/environment";
import {DataExchangeService} from "../services/data-exchange.service";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(data: FormData): Observable<any> {
    console.log(data)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;'
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/product/add-product-file`, data);
  }
}
