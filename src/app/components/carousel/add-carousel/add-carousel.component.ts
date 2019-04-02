import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatStepper} from "@angular/material";
import {FileUploadComponent} from "../../../file-upload/file-upload.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CarouselService} from "../../../services/carousel.service";
import {Carousel} from "../../../models/carousel";
import {deserialize, serialize} from "serializer.ts/Serializer";
import {CarouselFile} from "../../../models/carousel-file";

@Component({
  selector: 'app-add-carousel',
  templateUrl: './add-carousel.component.html',
  styleUrls: ['./add-carousel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddCarouselComponent implements OnInit {
  carousel: Carousel;
  basicInfoForm: FormGroup;
  stepOneCompleted = false;
  stepTwoCompleted = false;

  files: CarouselFile[] = [];

  @ViewChild('stepper')
  stepper: MatStepper;
  @ViewChild(FileUploadComponent)
  fileUploadComponent: FileUploadComponent;

  constructor(private carouselService: CarouselService) { }

  ngOnInit() {
    this.basicInfoForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'area': new FormControl(null, Validators.required),
      'width': new FormControl(null, [Validators.required, Validators.max(100), Validators.min(1)]),
      'height': new FormControl(null, [Validators.required, Validators.max(720), Validators.min(1)]),
      'sliderEffect': new FormControl(null, Validators.required)
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  uploadFinished(res: any) {
    this.files = deserialize<CarouselFile[]>(CarouselFile, res);
    this.stepTwoCompleted = true;
  }

  addCaptions() {
    this.carouselService.addCaptions(this.files).subscribe(
      res => {
        this.files = deserialize<CarouselFile[]>(CarouselFile, res);
      },
      err => {

      },
      () => {
        this.stepper.reset();
      }
    );
  }

  onSubmit() {
    const form = this.basicInfoForm;
    if (form.valid) {
      let toSubmit: Carousel = deserialize<Carousel>(Carousel, form.value);
      // ფორმაში ყველაფერი შევსებულია და ვამატებ პრუდუქტის ინფორმაციას.
      this.carouselService.addCarousel(serialize(toSubmit)).subscribe(
        res => {
          this.carousel = deserialize<Carousel>(Carousel, res);
          // პროდუქტის ინფორმაციის მოთხოვნა გაიგზავნა და უკან ბრუნდება პასუხი.
          this.stepOneCompleted = true;
          this.fileUploadComponent.formDataKey = ["carousel-id"];
          this.fileUploadComponent.formDataValue = [this.carousel.id];
          this.fileUploadComponent.formActionUrl = "admin/carousel/add-carousel-file";
        }
      );
    }
  }
}
