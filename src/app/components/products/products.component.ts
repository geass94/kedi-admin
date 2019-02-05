import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Observable} from "rxjs/index";
import {Product} from "../../models/product";


@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {
  products: Observable<Product[]>;
  variants: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  loadVariantsForProduct(product: Product) {
    console.log("eee");
  }

}
