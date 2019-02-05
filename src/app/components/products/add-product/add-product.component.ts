import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {deserialize, serialize} from "serializer.ts/Serializer";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";

import {MatStepper} from "@angular/material";
import {Observable} from "rxjs/index";
import {FileUploadComponent} from "../../../file-upload/file-upload.component";
import {Product} from "../../../models/product";
import {Color} from "../../../models/color";
import {Category} from "../../../models/category";
import {Manufacturer} from "../../../models/manufacturer";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }],
  encapsulation: ViewEncapsulation.None
})
export class AddProductComponent implements OnInit {
  colors: Observable<Color[]>;
  categories: Observable<Category[]>;
  manufacturers: Observable<Manufacturer[]>;

  basicInfoForm: FormGroup;

  variant: Product = new Product;

  stepOneCompleted = false;
  stepTwoCompleted = false;

  @ViewChild('stepper')
  stepper: MatStepper;
  @ViewChild(FileUploadComponent)
  fileUploadComponent: FileUploadComponent;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.colors = this.productService.getColors();
    this.categories = this.productService.getCategories();
    this.manufacturers = this.productService.getManufacturers();

    this.basicInfoForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'categoryList': new FormControl(null, Validators.required),
      'color': new FormControl(null, Validators.required),
      'manufacturer': new FormControl(null, Validators.required),
      'sex': new FormControl(null, Validators.required),
      'size': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const form = this.basicInfoForm;
    if (form.valid) {
      let toSubmit: Product = deserialize<Product>(Product, form.value);
      toSubmit.productVariantId = this.variant.productVariantId;
      toSubmit.productVariantIds = this.variant.productVariantIds;
      // ფორმაში ყველაფერი შევსებულია და ვამატებ პრუდუქტის ინფორმაციას.
      this.productService.addProduct(serialize(toSubmit)).subscribe(res => {
        // პროდუქტის ინფორმაციის მოთხოვნა გაიგზავნა და უკან ბრუნდება პასუხი.
        this.variant = res;
        this.stepOneCompleted = true;
        this.fileUploadComponent.formDataKey = "product-id";
        this.fileUploadComponent.formDataValue = this.variant.id;
      });
    }
  }

  createNewVariant() {
    this.stepper.reset();
    this.basicInfoForm.get("name").setValue(this.variant.name);
    this.basicInfoForm.get("price").setValue(this.variant.price);
    this.basicInfoForm.get("description").setValue(this.variant.description);
    this.basicInfoForm.get("categoryList").setValue(this.variant.categoryList);
    this.basicInfoForm.get("color").setValue(this.variant.color);
    this.basicInfoForm.get("manufacturer").setValue(this.variant.manufacturer);
    this.basicInfoForm.get("sex").setValue(this.variant.sex);
    this.basicInfoForm.get("size").setValue(this.variant.size);
    this.fileUploadComponent.resetUploader();
  }

  log(val) { console.log(val); }

}
