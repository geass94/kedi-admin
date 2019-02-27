import { Component, OnInit } from '@angular/core';
import {SpecificationsService} from "../../services/specifications.service";
import {Color} from "../../models/color";
import {NgForm} from "@angular/forms";
import {serialize} from "serializer.ts/Serializer";

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {
  colors: Color[];
  constructor(private specService: SpecificationsService) { }

  ngOnInit() {
    this.specService.getColors().subscribe(res => {
      this.colors = res;
    });
  }

  onSave(f: NgForm) {
    let color: Color = serialize(f.value);
    this.specService.saveColor(color, color.id);
  }

  onAdd(f: NgForm) {
    let color: Color = serialize(f.value);
    this.specService.addColor(color).subscribe((res) => {
        this.colors.unshift(res);
    });
    f.reset();
  }

  onDelete(color: Color) {
    this.specService.deleteColor(color.id).subscribe(
      (res) => {},
      (error) => {},
      () => {
        this.colors.splice(this.colors.indexOf(color), 1);
      }
    );
  }

}
