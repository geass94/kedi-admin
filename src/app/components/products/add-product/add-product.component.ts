import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

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
import {ProductFile} from "../../../models/product-file";
import {Size} from "../../../models/size";

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
  sizes: Observable<Size[]>;
  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();
  basicInfoForm: FormGroup;
  selectedCategories;
  @Input()
  variant: Product = new Product;
  files: ProductFile[] = [];

  stepOneCompleted = false;
  stepTwoCompleted = false;

  @ViewChild('stepper')
  stepper: MatStepper;
  @ViewChild(FileUploadComponent)
  fileUploadComponent: FileUploadComponent;

  constructor(private productService: ProductService, private specService: SpecificationsService) { }

  ngOnInit() {
    console.log("inited", this.variant);
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
    this.sizes = this.specService.getSizes();

    this.basicInfoForm = new FormGroup({
      'name': new FormControl(this.variant.name, Validators.required),
      'price': new FormControl(this.variant.price, Validators.required),
      'quantity': new FormControl(this.variant.quantity, Validators.required),
      'description': new FormControl(this.variant.quantity, Validators.required),
      'color': new FormControl(this.variant.color, Validators.required),
      'manufacturer': new FormControl(this.variant.manufacturer, Validators.required),
      'size': new FormControl(this.variant.size, Validators.required)
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

  uploadFinished(res) {
    this.stepTwoCompleted = true;
    this.files = deserialize<ProductFile[]>(ProductFile, res);
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
        this.fileUploadComponent.formActionUrl = "admin/product/add-product-file";
        this.stepper.next();
      });
    }
  }

  createNewVariant() {
    this.stepper.reset();
    this.basicInfoForm.get("name").setValue(this.variant.name);
    this.basicInfoForm.get("price").setValue(this.variant.price);
    this.basicInfoForm.get("quantity").setValue(this.variant.quantity);
    this.basicInfoForm.get("description").setValue(this.variant.description);
    this.basicInfoForm.get("color").setValue(this.variant.color);
    this.basicInfoForm.get("manufacturer").setValue(this.variant.manufacturer);
    this.basicInfoForm.get("size").setValue(this.variant.size);
    this.fileUploadComponent.resetUploader();
  }

}
