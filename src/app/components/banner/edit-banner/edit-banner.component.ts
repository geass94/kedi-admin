import { Component, OnInit } from '@angular/core';
import {Banner} from "../../../models/banner";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {BannerService} from "../../../services/banner.service";
import {deserialize, serialize} from "serializer.ts/Serializer";
import {BannerFile} from "../../../models/banner-file";
import {SpecificationsService} from "../../../services/specifications.service";

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.css']
})
export class EditBannerComponent implements OnInit {
  private id: number;
  banner: Banner = null;
  basicInfoForm: FormGroup;
  areas: { value: string, name: string }[] = [];
  constructor(private route: ActivatedRoute, private bannerService: BannerService, private specsService: SpecificationsService) { }

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

    this.areas.push( { value: 'shop-header', name: 'Shop Header Area' } );
    this.areas.push( { value: 'shop-sidebar', name: 'Shop Sidebar Area' } );
    this.areas.push( { value: 'product-details', name: 'Product Details Area' } );

    this.specsService.getCategories().subscribe(
      res => {
        res.forEach(c => {
          if (c.children.length > 0) {
            let obj = { value : `menu-area-${c.id}`, name: `Menu: ${c.name} Area` };
            this.areas.push(obj);
          }
        });
      }
    );
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
      'area': new FormControl(this.banner.area, Validators.required)
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
