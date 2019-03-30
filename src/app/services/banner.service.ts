import { Injectable } from '@angular/core';
import {Banner} from "../models/banner";
import {environment} from "../../environments/environment";
import {BannerFile} from "../models/banner-file";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }

  addBanner(banner: Banner) {
    return this.http.post(`${environment.apiUrl}/admin/banner/add-banner`, banner);
  }

  getBanner(id: number) {
    return this.http.get(`${environment.apiUrl}/banner/get-by-id/${id}`);
  }

  saveBanner(banner: Banner) {
    return this.http.put(`${environment.apiUrl}/admin/banner/save/${banner.id}`, banner);
  }

  addCaptions(files: BannerFile[]) {
    return this.http.post(`${environment.apiUrl}/admin/banner/add-captions`, files);
  }

  switchStatus(c: Banner, id: number) {
    return this.http.put(`${environment.apiUrl}/admin/banner/switch-status/${id}`, c);
  }

  deleteBanner(id: number) {
    this.http.delete(`${environment.apiUrl}/admin/banner/delete/${id}`).subscribe();
  }

  getBanners() {
    return this.http.get(`${environment.apiUrl}/banner/get-all`);
  }
}
