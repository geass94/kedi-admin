import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {NgForm} from "@angular/forms";
import {BasicPage} from "../../../models/basic-page";
import {deserialize} from "serializer.ts/Serializer";
import {BasicPageService} from "../../../services/basic-page.service";

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
  public Editor = DecoupledEditor;

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  constructor(private basicPageService: BasicPageService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    let page: BasicPage = deserialize(BasicPage, f.value);
    this.basicPageService.addPage(page).subscribe(res => {
      console.log(res);
    });
  }

}
