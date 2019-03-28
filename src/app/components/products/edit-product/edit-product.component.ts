import {AfterViewInit, Component, OnInit, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/index";
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {Color} from "../../../models/color";
import {Category} from "../../../models/category";
import {Manufacturer} from "../../../models/manufacturer";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {FileUploadComponent} from "../../../file-upload/file-upload.component";
import {SpecificationsService} from "../../../services/specifications.service";
import {deserialize, serialize} from "serializer.ts/Serializer";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material";
import {Bundle} from "../../../models/bundle";
import {Size} from "../../../models/size";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditProductComponent implements OnInit, AfterViewInit {
  product: Product;
  variants: Observable<Product[]>;
  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();
  colors: Observable<Color[]>;
  categories: Category[];
  manufacturers: Observable<Manufacturer[]>;
  sizes: Observable<Size[]>;
  basicInfoForm: FormGroup;
  productsForBundling: Product[] = [];

  bundlePrice = 0;
  bundleSale = 0;
  bundleProducts = [];

  private id: string;
  private selectedCategories;
  @ViewChildren('FileUploadComponent')
  fileUploadComponent: FileUploadComponent;

  constructor(private route: ActivatedRoute, private productService: ProductService, private specService: SpecificationsService) { }

  ngOnInit() {
    this.specService.getCategories().subscribe(res => {
      this.categories = res;
    }, err => {

    },
      () => {
        this.dataSource.data = this.categories;
    });
    this.colors = this.specService.getColors();
    this.manufacturers = this.specService.getManufacturers();
    this.sizes = this.specService.getSizes();

    this.productService.getProductsForBundling().subscribe(res => {
      this.productsForBundling = res;
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.productService.getProduct(this.id).subscribe((res) => {
          this.product = res;
        },
        (error) => {

        },
        () => {
          this.selectedCategories = this.product.categoryList;
          this.loadVariants();
          this.initForm();
        }
      );
    });
  }

  hasChild = (_: number, node: Category) => !!node.children && node.children.length > 0;

  inProductCategories(node: Category): boolean {
    if (this.product.categoryList.filter(c => c.id === node.id).length) {
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

  private loadVariants() {
    this.variants = this.productService.getProductVariants(this.product.productVariantIds);
  }

  finishUpload(files) {
    // this.fileUploadComponent.resetUploader();
  }

  onSubmit() {
    const form = this.basicInfoForm;
    if (form.valid) {
      let toSubmit: Product = deserialize<Product>(Product, form.value);
      toSubmit.productVariantId = this.product.productVariantId;
      toSubmit.productVariantIds = this.product.productVariantIds;
      toSubmit.categoryList = this.selectedCategories;
      // ფორმაში ყველაფერი შევსებულია და ვამატებ პრუდუქტის ინფორმაციას.
      this.productService.saveProduct(serialize(toSubmit), this.product.id).subscribe(res => {
        // პროდუქტის ინფორმაციის მოთხოვნა გაიგზავნა და უკან ბრუნდება პასუხი.
        this.product = res;
      });
    }
  }

  deleteFile(file) {
    this.productService.deleteFile(file.id).subscribe(res => {
      if (res) {
        this.product.productFiles.splice(this.product.productFiles.indexOf(file), 1);
      }
    });
  }

  private initForm() {
    this.basicInfoForm = new FormGroup({
      'name': new FormControl(this.product.name, Validators.required),
      'price': new FormControl(this.product.price, Validators.required),
      'description': new FormControl(this.product.description, Validators.required),
      'categoryList': new FormControl(this.product.categoryList, Validators.required),
      'color': new FormControl(this.product.color, Validators.required),
      'manufacturer': new FormControl(this.product.manufacturer, Validators.required),
      'size': new FormControl(this.product.size, Validators.required),
      'quantity': new FormControl(this.product.quantity, Validators.required),
      'sale': new FormControl(this.product.sale, Validators.nullValidator),
    });
  }


  updateBundlePriceAndSale(ev): void {
    this.bundleProducts = [];
    this.bundleProducts = deserialize<Product[]>(Product, ev);
    this.bundleProducts.push(this.product);
    this.updateBundlePrice();
  }

  updateBundlePrice(): void {
    this.bundlePrice = 0;
    this.bundleProducts.forEach(c => {
      this.bundlePrice += (c.price - (c.price * this.bundleSale / 100));
    });
  }

  createBundle(f: NgForm) {
    let bundle: Bundle = serialize<Bundle>(f.value);
    bundle.parent = this.product;

    this.productService.addBundle(bundle).subscribe(res => {
      this.product = res;
    });
  }

  ngAfterViewInit() {
  }
}
