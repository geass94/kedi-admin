import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {deserialize} from "serializer.ts/Serializer";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Color} from "../../models/color";
import {Category} from "../../models/category";
import {Manufacturer} from "../../models/manufacturer";
import {DataExchangeService} from "../../services/data-exchange.service";
import {MatStepper} from "@angular/material";
import {BehaviorSubject, Observable, pipe} from "rxjs/index";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  colors: Color[] = [];
  categories: Category[] = [];
  manufacturers: Manufacturer[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  variant: Product = null;
  stepOneCompleted = false;
  @ViewChild('stepper') stepper: MatStepper;

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private des: DataExchangeService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.products.push(deserialize<Product>(Product, res));
    });

    this.productService.getColors().subscribe(res => {
      this.colors.push(deserialize<Color>(Color, res));
    });

    this.productService.getCategories().subscribe(res => {
      this.categories.push(deserialize<Category>(Category, res));
    });

    this.productService.getManufacturers().subscribe(res => {
      this.manufacturers.push(deserialize<Manufacturer>(Manufacturer, res));
    });

    this.firstFormGroup = this.formBuilder.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productColor: ['', Validators.required],
      productSex: ['', Validators.required],
      productSize: ['', Validators.required],
      productCategory: ['', Validators.required],
      productManufacturer: ['', Validators.required],
      productDescription: ['', Validators.nullValidator],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onSubmit(form: NgForm) {
    const prod: Product = new Product;
    const values = form.value;

    prod.name = values.productName;
    prod.price = values.productPrice;
    prod.categoryList = values.productCategory;
    prod.sex = values.productSex;
    prod.size = values.productSize;
    prod.manufacturer = values.productManufacturer;
    prod.color = values.productColor;
    prod.description = values.productDescription;

    if (form.valid && typeof this.variant !== 'undefined') {
      this.productService.addProduct(prod).subscribe(res => {
        this.variant = res;
        this.stepOneCompleted = true;
        console.log("after", this.variant);
        this.des.changeMessage({ formDataKey: 'product-id', formDataValue: this.variant.id });
      });

    }
  }

}
