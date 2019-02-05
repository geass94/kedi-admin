import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/index";
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product;
  variants: Observable<Product[]>;
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe((res) => {
        this.product = res;
      },
      (error) => {

      },
      () => {
        this.loadVariants();
      }
    );
  }

  loadVariants() {
    this.variants = this.productService.getProductVariants(this.product.productVariantIds);
  }

}
