import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {FileUploadService} from "./file-upload.service";
import {DataExchangeService} from "../services/data-exchange.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FileUploadComponent implements OnInit {
  fromDataInfo: any;
  stepperInfo: any;
  uploadForm: FormGroup;
  formDataKey: string;
  formDataValue: string;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  constructor(private fb: FormBuilder, private fileUploadService: FileUploadService, private des: DataExchangeService) { }

  uploadSubmit() {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      const fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");
        return;
      }
    }

    let data = new FormData();
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let fileItem = this.uploader.queue[j]._file;
      data.append('files[]', fileItem);
    }
    data.append(this.formDataKey, this.formDataValue);
    this.fileUploadService.uploadFile(data).subscribe(res => alert(res.message));
    this.uploader.clearQueue();
  }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null]
    });

    this.des.currentMessage.subscribe(message => this.fromDataInfo = message);
    this.des.currentMessage.subscribe(message => this.stepperInfo = message);
    this.formDataKey = this.fromDataInfo.formDataKey;
    this.formDataValue = this.fromDataInfo.formDataValue;
    console.log("UPLOADER STEPPER", this.stepperInfo);
  }

}


