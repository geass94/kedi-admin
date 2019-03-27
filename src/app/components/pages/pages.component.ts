import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BasicPage} from "../../models/basic-page";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator, MatSort} from "@angular/material";
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {BasicPageService} from "../../services/basic-page.service";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'alias', 'actions'];
  data: BasicPage[] = [];
  selection = new SelectionModel<BasicPage>(true, []);
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  toggleSale = false;
  toggleRestock = false;
  toggleHighlight = false;
  constructor(private basicPageService: BasicPageService) { }

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
          return this.basicPageService.getPages(
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

  deletePage(page: BasicPage) {
    this.basicPageService.deletePage(page.id).subscribe(
      res => {
        window.location.reload();
      }
    );
  }

}
