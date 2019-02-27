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
  constructor(private specService: SpecificationsService) { }

  ngOnInit() {
    this.specService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  onSave(f: NgForm) {
    let cat: Category = serialize(f.value);
    // let category: Category = this.categories.filter(function(c) { return c.id === cat.id; })[0];
    console.log(cat)
    this.specService.saveCategory(cat, cat.id);
  }

  onAdd(f: NgForm) {
    let cat: Category = serialize(f.value);
    this.specService.addCategory(cat).subscribe((res) => {
      if (cat.parent !== null) {
        this.categories.filter(c => c.id === cat.parent.id).map(c => c.children.push(res));
      } else {
        this.categories.push(res);
      }
    });
  }

}
