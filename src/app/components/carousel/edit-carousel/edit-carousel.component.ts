import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Carousel} from "../../../models/carousel";
import {CarouselService} from "../../../services/carousel.service";
import {deserialize, serialize} from "serializer.ts/Serializer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CarouselFile} from "../../../models/carousel-file";

@Component({
  selector: 'app-edit-carousel',
  templateUrl: './edit-carousel.component.html',
  styleUrls: ['./edit-carousel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditCarouselComponent implements OnInit {
  private id: number;
  carousel: Carousel = null;
  basicInfoForm: FormGroup;
  constructor(private route: ActivatedRoute, private carouselService: CarouselService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'), 10);
      this.carouselService.getCarousel(this.id).subscribe(
        res => {
          this.carousel = deserialize<Carousel>(Carousel, res);
          console.log()
          this.initForm();
        }
      );
    });
  }

  onSubmit() {
    const form = this.basicInfoForm;
    if (form.valid) {
      let toSubmit: Carousel = deserialize<Carousel>(Carousel, form.value);
      this.carouselService.saveCarousel(serialize(toSubmit)).subscribe(
        res => {
          this.carousel = deserialize<Carousel>(Carousel, res);
        }
      );
    }
  }

  private initForm(): void {
    this.basicInfoForm = new FormGroup({
      'name': new FormControl(this.carousel.name, Validators.required),
      'area': new FormControl(this.carousel.area, Validators.required),
      'width': new FormControl(this.carousel.width, [Validators.required, Validators.max(100), Validators.min(1)]),
      'height': new FormControl(this.carousel.height, [Validators.required, Validators.max(720), Validators.min(1)]),
      'sliderEffect': new FormControl(this.carousel.sliderEffect, Validators.required)
    });
  }

  uploadFinished(res) {
    const files = deserialize<CarouselFile[]>(CarouselFile, res);
    files.forEach(f => {
      this.carousel.carouselFiles.push(f);
    });
  }

  addCaptions() {
    this.carouselService.addCaptions(this.carousel.carouselFiles).subscribe(
      res => {
        this.carousel.carouselFiles = deserialize<CarouselFile[]>(CarouselFile, res);
      }
    );
  }

}
