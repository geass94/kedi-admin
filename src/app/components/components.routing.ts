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
  }
];
