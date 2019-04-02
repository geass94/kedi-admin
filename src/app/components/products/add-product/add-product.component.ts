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
  colors: Color[];
  categories: Category[];
  manufacturers: Manufacturer[];
  sizes: Size[];
  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();
  basicInfoForm: FormGroup;
  selectedCategories: Category[] = [];
  @Input()
  variant: Product = new Product();
  files: ProductFile[] = [];

  stepOneCompleted = false;
  stepTwoCompleted = false;

  @ViewChild('stepper')
  stepper: MatStepper;
  @ViewChild(FileUploadComponent)
  fileUploadComponent: FileUploadComponent;

  colorLibraryTab = 0;
  manufacturerLibraryTab = 0;
  sizeLibraryTab = 0;

  colorVariants: Product[] = [];

  constructor(private productService: ProductService, private specService: SpecificationsService) { }

  ngOnInit() {
    this.specService.getCategories().subscribe(res => {
        this.categories = res;
      }, err => {

      },
      () => {
        this.dataSource.data = this.categories;
      });

    this.loadColors();
    this.loadManufacturers();
    this.loadSizes();

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

  private loadColors() {
    this.specService.getColors().subscribe(
      res => {
        this.colors = deserialize<Color[]>(Color, res);
      }
    );
  }

  private loadManufacturers() {
    this.specService.getManufacturers().subscribe(
      res => {
        this.manufacturers = deserialize<Manufacturer[]>(Manufacturer, res);
      }
    );
  }

  private loadSizes() {
    this.specService.getSizes().subscribe(
      res => {
        this.sizes = deserialize<Size[]>(Size, res);
      }
    );
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
    delete cat.parent;
    if (this.selectedCategories.indexOf(cat) === -1) {
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
      const formValue = serialize(form.value);
      toSubmit.productVariantId = this.variant.productVariantId;
      toSubmit.productVariantIds = this.variant.productVariantIds;
      toSubmit.categoryList = this.selectedCategories;
      toSubmit.size = formValue.size[0];
      toSubmit.color = formValue.color[0];

      // console.log("To Submit: ", toSubmit);
      // ფორმაში ყველაფერი შევსებულია და ვამატებ პრუდუქტის ინფორმაციას.
      this.productService.addProduct(serialize(toSubmit)).subscribe(
        res => {
          // პროდუქტის ინფორმაციის მოთხოვნა გაიგზავნა და უკან ბრუნდება პასუხი.
          this.variant = res;
        },
        err => {

        },
        () => {
          this.colorVariants.push(this.variant);
          this.iterate(formValue.color, formValue.size);
        }
      );
    }
  }

  private iterate(c: Color[], s: Size[]) {
    let sum = 0;
    for (let i = 0; i < c.length; i++) {
      for (let j = 0; j < s.length; j++) {
          this.iterateAdder(c[i], s[j], i, j);
          sum++;
        if (sum === c.length + s.length) {
          this.colorVariants.forEach(cv => {

          });
          this.stepOneCompleted = true;
          this.stepper.next();
        }
      }
    }
  }

  private iterateAdder(c: Color, s: Size, i: number, j: number) {
    if (i === 0 && j === 0) {
      return false;
    }
    this.variant.color = c;
    this.variant.size = s;
    delete this.variant.id;
    // console.log("Iterator toSubmit: ", this.variant);

    this.productService.addProduct(serialize(this.variant)).subscribe(
      res => {
        this.variant = res;
      },
      err => {

      },
      () => {
        if (this.colorVariants.filter(cv => cv.color.id === this.variant.color.id).length === 0) {
          this.colorVariants.push(this.variant);
        }
        // console.log("Iterator Complete: ", this.variant);
      }
    );
  }


  createNewVariant() {
    this.stepper.selectedIndex = 0;
    this.basicInfoForm.get("name").setValue(this.variant.name);
    this.basicInfoForm.get("price").setValue(this.variant.price);
    this.basicInfoForm.get("quantity").setValue(this.variant.quantity);
    this.basicInfoForm.get("description").setValue(this.variant.description);
    this.basicInfoForm.get("color").setValue([this.variant.color]);
    this.basicInfoForm.get("manufacturer").setValue(this.variant.manufacturer);
    this.basicInfoForm.get("size").setValue([this.variant.size]);
    this.fileUploadComponent.resetUploader();

    this.stepOneCompleted = false;
    this.stepTwoCompleted = false;
    this.files = [];
  }

  onColorTabChange(): void {
    if (this.colorLibraryTab === 0) {
      this.loadColors();
    }
  }

  onSizeTabChange(): void {
    if (this.sizeLibraryTab === 0) {
      this.loadSizes();
    }
  }

  onManufacturerTabChange(): void {
    if (this.manufacturerLibraryTab === 0) {
      this.loadManufacturers();
    }
  }

}
