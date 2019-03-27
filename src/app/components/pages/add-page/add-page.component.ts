import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {NgForm} from "@angular/forms";
import {BasicPage} from "../../../models/basic-page";
import {deserialize} from "serializer.ts/Serializer";
import {BasicPageService} from "../../../services/basic-page.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddPageComponent implements OnInit {
  public model = {
    name: '',
    alias: '',
    body: ''
  };
  unique = false;
  public Editor = DecoupledEditor;

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  constructor(private basicPageService: BasicPageService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  checkAlias() {
    this.basicPageService.checkAlias(this.model.alias).subscribe(
      res => {
        this.unique = res === true;
      },
      err => {

      },
      () => {
        if (!this.unique) {
          this.snackBar.open(`Page Alias: ${this.model.alias}`, 'MUST BE UNIQUE!', <MatSnackBarConfig>{
            duration: 5500,
          });
        }
      }
    );
  }

  onSubmit(f: NgForm) {
    if (this.unique) {
      let page: BasicPage = deserialize(BasicPage, f.value);
      this.basicPageService.addPage(page).subscribe(res => {
        window.location.href = "/pages";
      });
    } else {
      this.snackBar.open(`Page Alias: ${this.model.alias}`, 'MUST BE UNIQUE!', <MatSnackBarConfig>{
        duration: 5500,
      });
    }
  }

}
