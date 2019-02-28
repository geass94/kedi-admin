import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/index";
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {Color} from "../../../models/color";
import {Category} from "../../../models/category";
import {Manufacturer} from "../../../models/manufacturer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUploadComponent} from "../../../file-upload/file-upload.component";
import {SpecificationsService} from "../../../services/specifications.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product;
  variants: Observable<Product[]>;

  colors: Observable<Color[]>;
  categories: Observable<Category[]>;
  manufacturers: Observable<Manufacturer[]>;
  basicInfoForm: FormGroup;

  @ViewChild('FileUploadComponent')
  fileUploadComponent: FileUploadComponent;

  constructor(private route: ActivatedRoute, private productService: ProductService, private specService: SpecificationsService) { }

  ngOnInit() {
    this.categories = this.specService.getCategories();
    this.colors = this.specService.getColors();
    this.manufacturers = this.specService.getManufacturers();

    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe((res) => {
        this.product = res;
      },
      (error) => {

      },
      () => {
        this.loadVariants();
        this.initForm();
      }
    );
  }

  loadVariants() {
    this.variants = this.productService.getProductVariants(this.product.productVariantIds);
  }

  finishUpload() {
    this.fileUploadComponent.resetUploader();
  }

  initForm() {
    this.basicInfoForm = new FormGroup({
      'name': new FormControl(this.product.name, Validators.required),
      'price': new FormControl(this.product.price, Validators.required),
      'description': new FormControl(this.product.description, Validators.required),
      'categoryList': new FormControl(this.product.categoryList, Validators.required),
      'color': new FormControl(this.product.color, Validators.required),
      'manufacturer': new FormControl(this.product.manufacturer, Validators.required),
      'sex': new FormControl(this.product.sex, Validators.required),
      'size': new FormControl(this.product.size, Validators.required)
    });


    if (this.fileUploadComponent) {
      console.log(this.fileUploadComponent)
      this.fileUploadComponent.formDataKey = "product-id";
      this.fileUploadComponent.formDataValue = this.product.id;
    }

  }

}
