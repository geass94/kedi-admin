import { Component, OnInit } from '@angular/core';
import {Banner} from "../../../models/banner";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {BannerService} from "../../../services/banner.service";
import {deserialize, serialize} from "serializer.ts/Serializer";
import {BannerFile} from "../../../models/banner-file";

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.css']
})
export class EditBannerComponent implements OnInit {
  private id: number;
  banner: Banner = null;
  basicInfoForm: FormGroup;
  constructor(private route: ActivatedRoute, private bannerService: BannerService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'), 10);
      this.bannerService.getBanner(this.id).subscribe(
        res => {
          this.banner = deserialize<Banner>(Banner, res);
          this.initForm();
        }
      );
    });
  }

  onSubmit() {
    const form = this.basicInfoForm;
    if (form.valid) {
      let toSubmit: Banner = deserialize<Banner>(Banner, form.value);
      this.bannerService.saveBanner(serialize(toSubmit)).subscribe(
        res => {
          this.banner = deserialize<Banner>(Banner, res);
        }
      );
    }
  }

  private initForm(): void {
    this.basicInfoForm = new FormGroup({
      'name': new FormControl(this.banner.name, Validators.required),
      'area': new FormControl(this.banner.area, Validators.required),
      'width': new FormControl(this.banner.width, [Validators.required, Validators.max(100), Validators.min(1)]),
      'height': new FormControl(this.banner.height, [Validators.required, Validators.max(720), Validators.min(1)]),
      'sliderEffect': new FormControl(this.banner.sliderEffect, Validators.required)
    });
  }

  uploadFinished(res) {
    const files = deserialize<BannerFile[]>(BannerFile, res);
    files.forEach(f => {
      this.banner.bannerFiles.push(f);
    });
  }

  addCaptions() {
    this.bannerService.addCaptions(this.banner.bannerFiles).subscribe(
      res => {
        this.banner.bannerFiles = deserialize<BannerFile[]>(BannerFile, res);
      }
    );
  }

}
