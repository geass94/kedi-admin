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
  private categories: Category[] = [];
  private subCategories: Category[] = [];
  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();
  dataSourceChildren = new MatTreeNestedDataSource<Category>();
  private chosenParent: Category = new Category;
  constructor(private specService: SpecificationsService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.specService.getCategories().subscribe(
      (res) => {
        // this.setChildren(res);
        this.categories = res;
        this.subCategories = res;
        // this.loadChildren(res);
      },
      (err) => {

      },
      () => {

        this.dataSource.data = this.categories;
        this.dataSourceChildren.data = this.subCategories;
      }
    );
  }

  private loadChildren(cat: Category[]) {
    cat.forEach(c => {
      if (c.children.length) {
        c.children.forEach(s => {
          if (this.subCategories.indexOf(s) === -1) {
            this.subCategories.push(s);
          }
          s.parent = c;
          if (typeof this.categories[this.subCategories.indexOf(c)] !== 'undefined'
            && this.categories[this.subCategories.indexOf(c)].children.indexOf(s) === -1) {
            this.categories[this.subCategories.indexOf(c)].children.push(s);
          }
        });
        this.loadChildren(c.children);
      }
    });
  }


  onParentChoose(node: Category) {
    if (typeof node.children.length) {
      delete node.children;
    }
    if (typeof node.parent !== 'undefined') {
      delete node.parent;
    }
    this.chosenParent = serialize(node);
  }

  hasChild = (_: number, node: Category) => !!node.children && node.children.length > 0;

  private setChildren (cat: Category[]) {
    cat.forEach(c => {
      if (this.categories.indexOf(c) === -1 && typeof c.parent === 'undefined') {
        this.categories.push(c);
      }

      if (c.children.length) {
          c.children.forEach(s => {
            s.parent = c;
            if (typeof this.categories[this.categories.indexOf(c)] !== 'undefined'
              && this.categories[this.categories.indexOf(c)].children.indexOf(s) === -1) {
              this.categories[this.categories.indexOf(c)].children.push(s);
            }
          });
        this.setChildren(c.children);
      }
    });
  }


  onSave(f: NgForm) {
    let cat: Category = serialize(f.value);
    this.specService.saveCategory(cat, cat.id);
    this.loadCategories();
    this.snackBar.open(`Category: ${cat.name}`, 'Saved', <MatSnackBarConfig>{
      duration: 1500,
    });
  }

  onAdd(f: NgForm) {
    let cat: Category = serialize(f.value);
    cat.parent = this.chosenParent;
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

}
