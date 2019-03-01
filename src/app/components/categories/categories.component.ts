import { Component, OnInit } from '@angular/core';
import {Category} from "../../models/category";
import {NgForm} from "@angular/forms";
import {serialize} from "serializer.ts/Serializer";
import {SpecificationsService} from "../../services/specifications.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  children: Category[] = [];
  constructor(private specService: SpecificationsService) { }

  ngOnInit() {
    this.specService.getCategories().subscribe(res => {
      this.categories = res;
      this.categories.forEach(c => {
        this.setChildren(c);
      });
    });

    console.log(this.children);
  }

  getChildrenByParent(id: number): Category[] {
    return this.children.filter(c => c.parent.id === id);
  }

  setChildren (cat: Category) {
    if (cat.children.length) {
      cat.children.forEach(c => {
        c.parent = cat;
        this.children.push(c);
        this.setChildren(c);
      });
    }
  }

  onSave(f: NgForm) {
    let cat: Category = serialize(f.value);
    this.specService.saveCategory(cat, cat.id);
  }

  onAdd(f: NgForm) {
    let cat: Category = serialize(f.value);
    this.specService.addCategory(cat).subscribe((res) => {
      if (cat.parent !== null && typeof cat.parent !== 'undefined') {
        this.categories.filter(c => c.id === cat.parent.id).map(c => c.children.push(res));
      } else {
        this.categories.unshift(res);
      }
    });
    f.reset();
  }

  onDelete(cat: Category) {
    this.specService.deleteCategory(cat.id).subscribe(
      (res) => {},
      (error) => {},
      () => {
        if (this.categories.indexOf(cat) === -1) {
          this.categories.map(c => c.children.filter(a => a.id === cat.id).map(b => c.children.splice(c.children.indexOf(b), 1)));
        } else {
          this.categories.splice(this.categories.indexOf(cat), 1);
        }

      }
      );
  }

}
