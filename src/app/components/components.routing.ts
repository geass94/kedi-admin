import {Routes} from "@angular/router";
import {UsersComponent} from "./users/users.component";
import {ProductsComponent} from "./products/products.component";
import {AddProductComponent} from "./products/add-product/add-product.component";
import {EditProductComponent} from "./products/edit-product/edit-product.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ManufacturersComponent} from "./manufacturers/manufacturers.component";
import {ColorsComponent} from "./colors/colors.component";
import {PagesComponent} from "./pages/pages.component";
import {AddPageComponent} from "./pages/add-page/add-page.component";
import {EditPageComponent} from "./pages/edit-page/edit-page.component";
import {CarouselComponent} from "./carousel/carousel.component";
import {AddCarouselComponent} from "./carousel/add-carousel/add-carousel.component";
import {EditCarouselComponent} from "./carousel/edit-carousel/edit-carousel.component";
import {SizeComponent} from "./size/size.component";
import {BannerComponent} from "./banner/banner.component";
import {AddBannerComponent} from "./banner/add-banner/add-banner.component";
import {EditBannerComponent} from "./banner/edit-banner/edit-banner.component";

export const ComponentsRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/add',
    component: AddProductComponent
  },
  {
    path: 'products/:id',
    component: EditProductComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'manufacturers',
    component: ManufacturersComponent
  },
  {
    path: 'colors',
    component: ColorsComponent
  },
  {
    path: 'size',
    component: SizeComponent
  },
  {
    path: 'pages',
    component: PagesComponent
  },
  {
    path: 'pages/add',
    component: AddPageComponent
  },
  {
    path: 'pages/:alias',
    component: EditPageComponent
  },
  {
    path: 'carousel',
    component: CarouselComponent
  },
  {
    path: 'carousel/add',
    component: AddCarouselComponent
  },
  {
    path: 'carousel/:id',
    component: EditCarouselComponent
  },
  {
    path: 'banner',
    component: BannerComponent
  },
  {
    path: 'banner/add',
    component: AddBannerComponent
  },
  {
    path: 'banner/:id',
    component: EditBannerComponent
  }
];
