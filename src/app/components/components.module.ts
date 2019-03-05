import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ComponentsRoutes} from "./components.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule, MatListModule, MatPaginatorModule,
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
    PagesComponent
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
    MatSlideToggleModule
  ]
})
export class ComponentsModule { }
