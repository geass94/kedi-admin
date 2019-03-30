import { Component, OnInit } from '@angular/core';
import {Banner} from "../../models/banner";
import {BannerService} from "../../services/banner.service";
import {deserialize} from "serializer.ts/Serializer";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  banners: Banner[] = [];

  constructor(private bannerService: BannerService) { }

  ngOnInit() {
    this.bannerService.getBanners().subscribe(
      res => {
        this.banners = deserialize<Banner[]>(Banner, res);
      }
    );
  }

  statusButtonLabel(status: string) {
    return status === "ACTIVE" ? "Disable" : "Enable";
  }

  deleteBanner(id: number) {
    this.bannerService.deleteBanner(id);
    this.banners.splice( this.banners.indexOf(this.banners.find(c => c.id === id)[0]), 1);
  }

  switchStatus(banner: Banner) {
    this.bannerService.switchStatus(banner, banner.id).subscribe(
      res => {
        const switched = deserialize<Banner>(Banner, res);
        this.banners.filter(c => c.id === switched.id)[0].status = switched.status;
      }
    );
  }

}
