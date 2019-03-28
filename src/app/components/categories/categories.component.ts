import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Category} from "../../models/category";
import {NgForm} from "@angular/forms";
import {serialize} from "serializer.ts/Serializer";
import {SpecificationsService} from "../../services/specifications.service";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatSnackBar, MatSnackBarConfig, MatTreeNestedDataSource} from "@angular/material";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  allCategories: Category[] = [];
  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();

  activeTab = 0;

  chosenCategory: Category = new Category();
  catForm: Category = new Category();

  constructor(private specService: SpecificationsService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.specService.getCategories().subscribe(
      (res) => {
        this.categories = res;
      },
      (err) => {

      },
      () => {

        this.specService.getAllCategories().subscribe(
          res => {
            this.allCategories = res;
            this.allCategories.map(c => {
              delete c.parent;
              delete c.children;
            });
          }
        );

        this.categories.map(c => {
          this.setParents(c);
        });

        this.dataSource.data = this.categories;
      }
    );
  }

  private setParents(cat: Category) {
    if (cat.children.length) {
      cat.children.map(c => {
        c.parent = cat;
        this.setParents(c);
      });
    }
  }

  onParentChoose(node: Category) {
    this.activeTab = 1;
    this.chosenCategory = serialize(node);
  }

  hasChild = (_: number, node: Category) => !!node.children && node.children.length > 0;

  onSave(f: NgForm) {
    let cat: Category = serialize(f.value);
    if (typeof cat.parent !== "undefined") {
      delete cat.parent.children;
      if (typeof cat.parent.parent !== "undefined") {
        delete cat.parent.parent;
      }
    }
    delete cat.children;
    console.log(cat)
    this.specService.saveCategory(cat, cat.id).subscribe(
      res => {
        this.loadCategories();
        this.snackBar.open(`Category: ${cat.name}`, 'Saved', <MatSnackBarConfig>{
          duration: 3500,
        });
      }
    );
  }

  onAdd(f: NgForm) {
    let cat: Category = serialize(this.catForm);
    this.specService.addCategory(cat).subscribe((res) => {
      this.loadCategories();
      this.snackBar.open(`Category: ${res.name}`, 'Added');
    });
    f.reset();
  }

  onDelete(cat: Category) {
    this.specService.deleteCategory(cat.id).subscribe(
      (res) => {},
      (error) => {},
      () => {
        this.loadCategories();
        this.snackBar.open(`Category: ${cat.name}`, 'Deleted');
      }
    );
  }

  compareFn(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
