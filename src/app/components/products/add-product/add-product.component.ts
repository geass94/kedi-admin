import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {deserialize, serialize} from "serializer.ts/Serializer";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";

import {MatStepper, MatTreeNestedDataSource} from "@angular/material";
import {Observable} from "rxjs/index";
import {FileUploadComponent} from "../../../file-upload/file-upload.component";
import {Product} from "../../../models/product";
import {Color} from "../../../models/color";
import {Category} from "../../../models/category";
import {Manufacturer} from "../../../models/manufacturer";
import {ProductService} from "../../../services/product.service";
import {SpecificationsService} from "../../../services/specifications.service";
import {NestedTreeControl} from "@angular/cdk/tree";

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
  categories: Category[];
  manufacturers: Observable<Manufacturer[]>;
  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();
  basicInfoForm: FormGroup;
  private selectedCategories;
  variant: Product = new Product;

  stepOneCompleted = false;
  stepTwoCompleted = false;

  @ViewChild('stepper')
  stepper: MatStepper;
  @ViewChild(FileUploadComponent)
  fileUploadComponent: FileUploadComponent;

  constructor(private productService: ProductService, private specService: SpecificationsService) { }

  ngOnInit() {
    this.colors = this.specService.getColors();
    this.specService.getCategories().subscribe(res => {
        this.categories = res;
      }, err => {

      },
      () => {
      this.selectedCategories = this.categories;
        this.dataSource.data = this.categories;
      });
    this.manufacturers = this.specService.getManufacturers();

    this.basicInfoForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'color': new FormControl(null, Validators.required),
      'manufacturer': new FormControl(null, Validators.required),
      'sex': new FormControl(null, Validators.required),
      'size': new FormControl(null, Validators.required)
    });
  }

  hasChild = (_: number, node: Category) => !!node.children && node.children.length > 0;

  inProductCategories(node: Category): boolean {
    if (this.variant.id > 0 && this.variant.categoryList.filter(c => c.id === node.id).length) {
      return true;
    }
    return false;
  }

  onCategoryChoose(cat: Category): void {
    delete cat.children;
    if (!this.selectedCategories.filter(c => c.id === cat.id).length) {
      this.selectedCategories.push(cat);
    } else {
      this.selectedCategories.splice(this.selectedCategories.indexOf(cat), 1);
    }
  }

  compareFn(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onSubmit() {
    const form = this.basicInfoForm;
    if (form.valid) {
      let toSubmit: Product = deserialize<Product>(Product, form.value);
      toSubmit.productVariantId = this.variant.productVariantId;
      toSubmit.productVariantIds = this.variant.productVariantIds;
      toSubmit.categoryList = this.selectedCategories;
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

}
