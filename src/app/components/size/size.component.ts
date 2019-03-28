import { Component, OnInit } from '@angular/core';
import {Size} from "../../models/size";
import {SpecificationsService} from "../../services/specifications.service";
import {NgForm} from "@angular/forms";
import {serialize} from "serializer.ts/Serializer";

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {
  sizes: Size[];
  constructor(private specService: SpecificationsService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.specService.getSizes().subscribe(res => {
      this.sizes = res;
    });
  }

  onSave(f: NgForm) {
    let size: Size = serialize(f.value);
    this.specService.saveSize(size, size.id);
  }

  onAdd(f: NgForm) {
    let size: Size = serialize(f.value);
    this.specService.addSize(size).subscribe((res) => {
      this.loadData();
    });
    f.reset();
  }

  onDelete(size: Size) {
    this.specService.deleteSize(size.id).subscribe(
      (res) => {},
      (error) => {},
      () => {
        this.sizes.splice(this.sizes.indexOf(size), 1);
      }
    );
  }

}
