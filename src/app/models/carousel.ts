import {CarouselFile} from "./carousel-file";

export class Carousel {
  id: number;
  status: string;
  name: string;
  area: string;
  sliderEffect: string;
  width = 600;
  height = 480;
  dimensionUnit = "px";
  carouselFiles: CarouselFile[];
}
