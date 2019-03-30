import {Component, OnInit, ViewChild} from '@angular/core';
import {Banner} from "../../../models/banner";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BannerFile} from "../../../models/banner-file";
import {MatStepper} from "@angular/material";
import {FileUploadComponent} from "../../../file-upload/file-upload.component";
import {BannerService} from "../../../services/banner.service";
import {deserialize, serialize} from "serializer.ts/Serializer";

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.css']
})
export class AddBannerComponent implements OnInit {
  banner: Banner;
  basicInfoForm: FormGroup;
  stepOneCompleted = false;
  stepTwoCompleted = false;

  files: BannerFile[] = [];

  @ViewChild('stepper')
  stepper: MatStepper;
  @ViewChild(FileUploadComponent)
  fileUploadComponent: FileUploadComponent;

  constructor(private bannerService: BannerService) { }

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
    this.files = deserialize<BannerFile[]>(BannerFile, res);
    this.stepTwoCompleted = true;
  }

  addCaptions() {
    this.bannerService.addCaptions(this.files).subscribe(
      res => {
        this.files = deserialize<BannerFile[]>(BannerFile, res);
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
      let toSubmit: Banner = deserialize<Banner>(Banner, form.value);
      // ფორმაში ყველაფერი შევსებულია და ვამატებ პრუდუქტის ინფორმაციას.
      this.bannerService.addBanner(serialize(toSubmit)).subscribe(
        res => {
          this.banner = deserialize<Banner>(Banner, res);
          // პროდუქტის ინფორმაციის მოთხოვნა გაიგზავნა და უკან ბრუნდება პასუხი.
          this.stepOneCompleted = true;
          this.fileUploadComponent.formDataKey = "banner-id";
          this.fileUploadComponent.formDataValue = this.banner.id;
          this.fileUploadComponent.formActionUrl = "admin/banner/add-banner-file";
        }
      );
    }
  }

}
