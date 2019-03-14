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

  addCaptions(files: CarouselFile[]) {
    return this.http.post(`${environment.apiUrl}/admin/carousel/add-captions`, files);
  }
}
