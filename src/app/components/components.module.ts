import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ComponentsRoutes} from "./components.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocompleteModule, MatBadgeModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule, MatListModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule,
  MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
  MatStepperModule, MatTableModule, MatTabsModule, MatTreeModule
} from "@angular/material";
import {UsersComponent} from "./users/users.component";
import { ProductsComponent } from './products/products.component';
import {FileUploadComponent} from "../file-upload/file-upload.component";
import {FileUploadModule} from "ng2-file-upload";
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { CategoriesComponent } from './categories/categories.component';
import { ManufacturersComponent } from './manufacturers/manufacturers.component';
import { ColorsComponent } from './colors/colors.component';
import { PagesComponent } from './pages/pages.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import { CarouselComponent } from './carousel/carousel.component';
import { AddCarouselComponent } from './carousel/add-carousel/add-carousel.component';
import { EditCarouselComponent } from './carousel/edit-carousel/edit-carousel.component';
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import { SizeComponent } from './size/size.component';
import {ColorPickerModule} from "ngx-color-picker";
import { BannerComponent } from './banner/banner.component';
import { AddBannerComponent } from './banner/add-banner/add-banner.component';
import { EditBannerComponent } from './banner/edit-banner/edit-banner.component';

@NgModule({
  declarations: [
    UsersComponent,
    ProductsComponent,
    FileUploadComponent,
    AddProductComponent,
    EditProductComponent,
    DashboardComponent,
    CategoriesComponent,
    ManufacturersComponent,
    ColorsComponent,
    PagesComponent,
    AddPageComponent,
    EditPageComponent,
    CarouselComponent,
    AddCarouselComponent,
    EditCarouselComponent,
    SizeComponent,
    BannerComponent,
    AddBannerComponent,
    EditBannerComponent
  ],
  imports: [
    RouterModule.forChild(ComponentsRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatStepperModule,
    MatSelectModule,
    MatAutocompleteModule,
    FileUploadModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatListModule,
    MatProgressBarModule,
    MatGridListModule,
    MatTreeModule,
    MatRadioModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatBadgeModule,
    CKEditorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    ColorPickerModule
  ]
})
export class ComponentsModule { }
