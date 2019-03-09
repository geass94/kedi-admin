import {Component, ViewChild, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {SelectionModel} from "@angular/cdk/collections";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'price', 'sale', 'quantity', 'promoted', 'actions'];
  data: Product[] = [];
  selection = new SelectionModel<Product>(true, []);
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  toggleSale = false;
  toggleRestock = false;
  toggleHighlight = false;

  constructor(private productService: ProductService) {}

  ngAfterViewInit() {
    this.selection.changed.subscribe(res => {

    });

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.productService.getProducts(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.numberOfElements;
          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  onSaleSubmit(f: NgForm) {
    if (!f.value.sale) {
      f.value.sale = 0;
    }

    this.productService.setSale(this.selection.selected, f.value.sale).subscribe(res => {
      res.forEach(c => {
        this.data.filter(d => d.id === c.id)[0].sale = c.sale;
      });
    });
  }

  onRestockSubmit(f: NgForm) {
    if (!f.value.quantity) {
      f.value.quantity = 0;
    }

    this.productService.refillStock(this.selection.selected, f.value.quantity).subscribe(res => {
      res.forEach(c => {
        this.data.filter(d => d.id === c.id)[0].quantity = c.quantity;
      });
    });
  }

  togglePromotion(): void {
    this.productService.togglePromotion(this.selection.selected).subscribe(res => {
      res.forEach(c => {
        this.data.filter(d => d.id === c.id)[0].promoted = c.promoted;
      });
    });
  }

  promote(p: Product): void {
    this.productService.togglePromotion([p]).subscribe(res => {
      res.forEach(c => {
        this.data.filter(d => d.id === c.id)[0].promoted = c.promoted;
      });
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.forEach(row => this.selection.select(row));
  }

}

export interface ProductPage {
  content: Product[];
  numberOfElements: number;
}
