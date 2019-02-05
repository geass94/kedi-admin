import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ComponentsRoutes} from "./components.routing";
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatSelectModule,
  MatStepperModule
} from "@angular/material";
import {UsersComponent} from "./users/users.component";
import { ProductsComponent } from './products/products.component';
import {FileUploadComponent} from "../file-upload/file-upload.component";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
  declarations: [
    LoginComponent,
    UsersComponent,
    ProductsComponent,
    FileUploadComponent
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
    MatListModule
  ]
})
export class ComponentsModule { }
