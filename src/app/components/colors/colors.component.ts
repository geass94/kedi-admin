import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {SpecificationsService} from "../../services/specifications.service";
import {Color} from "../../models/color";
import {NgForm} from "@angular/forms";
import {serialize} from "serializer.ts/Serializer";

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ColorsComponent implements OnInit {
  colors: Color[];
  color = new Color();
  public selectedColor = '#2889e9';

  constructor(private specService: SpecificationsService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.specService.getColors().subscribe(res => {
      this.colors = res;
    });
  }

  onSave(f: NgForm) {
    let color: Color = serialize(f.value);
    this.specService.saveColor(color, color.id).subscribe(
      res => {
        this.loadData();
      }
    );
  }

  onAdd(f: NgForm) {
    let color: Color = serialize(f.value);
    this.specService.addColor(color).subscribe((res) => {
      this.loadData();
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


  public applyInputValue(model: Color, data: any): void {
    this.color.hex = data.color;
  }

  updateCurrentColor(model: Color, data: any): void {
    model.hex = data.color;
  }


}
