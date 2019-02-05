import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {serialize} from "serializer.ts/Serializer";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Color} from "../../models/color";
import {Category} from "../../models/category";
import {Manufacturer} from "../../models/manufacturer";
import {DataExchangeService} from "../../services/data-exchange.service";
import {MatStepper} from "@angular/material";
import {Observable} from "rxjs/index";
import {FileUploadComponent} from "../../file-upload/file-upload.component";

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {
  products: Observable<Product[]>;
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

  constructor(private productService: ProductService, private des: DataExchangeService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.products.subscribe();

    this.colors = this.productService.getColors();
    this.colors.subscribe();

    this.categories = this.productService.getCategories();
    this.categories.subscribe();

    this.manufacturers = this.productService.getManufacturers();
    this.manufacturers.subscribe();

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
      // ფორმაში ყველაფერი შევსებულია და ვამატებ პრუდუქტის ინფორმაციას.
      this.productService.addProduct(serialize(form.value)).subscribe(res => {
        // პროდუქტის ინფორმაციის მოთხოვნა გაიგზავნა და უკან ბრუნდება პასუხი.
        this.variant = res;
        this.stepOneCompleted = true;
        // სერვისით ვაგზავნი ფაილების ასატვირთად დამატებული პროდუქტის ინფორმაციას.
        this.des.changeMessage({ formDataKey: 'product-id', formDataValue: this.variant.id });
      });
    }
  }

}
