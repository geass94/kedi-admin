import {Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {UsersComponent} from "./users/users.component";
import {ProductsComponent} from "./products/products.component";
import {AddProductComponent} from "./products/add-product/add-product.component";
import {EditProductComponent} from "./products/edit-product/edit-product.component";

export const ComponentsRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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
  }
];
