import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Carousel} from "../models/carousel";
import {environment} from "../../environments/environment";
import {CarouselFile} from "../models/carousel-file";

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private http: HttpClient) { }

  addCarousel(carousel: Carousel) {
    return this.http.post(`${environment.apiUrl}/admin/carousel/add-carousel`, carousel);
  }

  getCarousel(id: number) {
    return this.http.get(`${environment.apiUrl}/carousel/get-by-id/${id}`);
  }

  saveCarousel(carousel: Carousel) {
    return this.http.put(`${environment.apiUrl}/admin/carousel/save/${carousel.id}`, carousel);
  }

  addCaptions(files: CarouselFile[]) {
    return this.http.post(`${environment.apiUrl}/admin/carousel/add-captions`, files);
  }

  switchStatus(c: Carousel, id: number) {
    return this.http.put(`${environment.apiUrl}/admin/carousel/switch-status/${id}`, c);
  }

  deleteCarousel(id: number) {
    this.http.delete(`${environment.apiUrl}/admin/carousel/delete/${id}`).subscribe();
  }

  getCarousels() {
    return this.http.get(`${environment.apiUrl}/carousel/get-all`);
  }
}
