import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {BasicPageService} from "../../../services/basic-page.service";
import {deserialize} from "serializer.ts/Serializer";
import {BasicPage} from "../../../models/basic-page";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  private alias: string;
  public model = {
    id: 0,
    name: '',
    alias: '',
    body: ''
  };
  public Editor = DecoupledEditor;

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  constructor(private route: ActivatedRoute, private basicPageService: BasicPageService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.alias = params.get('alias');
      this.basicPageService.getPage(this.alias).subscribe(
        (res) => {
          let page = deserialize<BasicPage>(BasicPage, res);
          this.mapModel(page);
        },
        (error) => {

        },
        () => {

        }
      );
    });
  }

  onSubmit(f: NgForm) {
    let page: BasicPage = deserialize(BasicPage, f.value);
    this.basicPageService.savePage(page, page.id).subscribe(res => {
      let data = deserialize<BasicPage>(BasicPage, res);
      this.mapModel(data);
    });
  }


  private mapModel(page: BasicPage) {
    this.model.id = page.id;
    this.model.name = page.name;
    this.model.alias = page.alias;
    this.model.body = page.body;
  }
}
