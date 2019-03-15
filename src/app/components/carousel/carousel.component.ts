import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Carousel} from "../../models/carousel";
import {CarouselService} from "../../services/carousel.service";
import {deserialize} from "serializer.ts/Serializer";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit {
  carousels: Carousel[] = [];

  constructor(private carouselService: CarouselService) { }

  ngOnInit() {
    this.carouselService.getCarousels().subscribe(
      res => {
        this.carousels = deserialize<Carousel[]>(Carousel, res);
      }
    );
  }

  statusButtonLabel(status: string) {
    return status === "ACTIVE" ? "Disable" : "Enable";
  }

  deleteCarousel(id: number) {
    this.carouselService.deleteCarousel(id);
    this.carousels.splice( this.carousels.indexOf(this.carousels.find(c => c.id === id)[0]), 1);
  }

  switchStatus(carousel: Carousel) {
    this.carouselService.switchStatus(carousel, carousel.id).subscribe(
      res => {
        const switched = deserialize<Carousel>(Carousel, res);
        this.carousels.filter(c => c.id === switched.id)[0].status = switched.status;
      }
    );
  }

}
