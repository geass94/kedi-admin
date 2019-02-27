import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {deserialize} from "serializer.ts/Serializer";


@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  variants: Product[] = [];


  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((res) => {
      this.products = deserialize(Product, res);
      this.products.forEach(product => {
        this.productService.getProductVariants(product.productVariantIds).subscribe((variant) => {
          this.variants.push( deserialize(Product, variant) );
        });
      });
    });
  }
}
