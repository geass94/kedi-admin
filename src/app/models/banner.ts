import {BannerFile} from "./banner-file";

export class Banner {
  id: number;
  status: string;
  name: string;
  area: string;
  sliderEffect: string;
  width = 600;
  height = 480;
  dimensionUnit = "px";
  validTill: string;
  bannerFiles: BannerFile[];
}
