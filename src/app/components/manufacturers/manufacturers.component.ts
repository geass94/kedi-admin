import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Manufacturer} from "../../models/manufacturer";
import {serialize} from "serializer.ts/Serializer";
import {SpecificationsService} from "../../services/specifications.service";

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.css']
})
export class ManufacturersComponent implements OnInit {
  manufacturers: Manufacturer[];
  constructor(private specService: SpecificationsService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.specService.getManufacturers().subscribe(res => {
      this.manufacturers = res;
    });
  }

  onSave(f: NgForm) {
    let manufacturer: Manufacturer = serialize(f.value);
    this.specService.saveManufacturer(manufacturer, manufacturer.id);
  }

  onAdd(f: NgForm) {
    let manufacturer: Manufacturer = serialize(f.value);
    this.specService.addManufacturer(manufacturer).subscribe((res) => {
      this.loadData();
    });
    f.reset();
  }

  onDelete(manufacturer: Manufacturer) {
    this.specService.deleteManufacturer(manufacturer.id).subscribe(
      (res) => {},
      (error) => {},
      () => {
        this.manufacturers.splice(this.manufacturers.indexOf(manufacturer), 1);
      }
    );
  }

}
