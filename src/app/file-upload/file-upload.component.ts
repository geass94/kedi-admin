import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUploadService} from "./file-upload.service";
import {DataExchangeService} from "../services/data-exchange.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FileUploadComponent implements OnInit {
  fileUploadForm: FormGroup = new FormGroup({
    'files': new FormControl(null, Validators.required)
  });
  fromDataInfo: any;
  stepperInfo: any;
  formDataKey: string;
  formDataValue: string;

  selectedFiles: File[] = [];
  @Output() validateUploadForm = new EventEmitter<string>();


  constructor(private fileUploadService: FileUploadService, private des: DataExchangeService) { }

  ngOnInit() {

    this.des.currentMessage.subscribe(message => this.fromDataInfo = message);
    this.des.currentMessage.subscribe(message => this.stepperInfo = message);
    this.formDataKey = this.fromDataInfo.formDataKey;
    this.formDataValue = this.fromDataInfo.formDataValue;
  }

  onFileSelect(event) {
    for (let singleFile of event.target.files) {
      this.selectedFiles.push(<File>singleFile);
    }
  }

  removeSelectedFiles(fiels) {
    for (let el of fiels.selectedOptions.selected) {
      const ind = this.selectedFiles.indexOf(el.value);
      this.selectedFiles.splice(ind, 1);
    }
  }

  onSubmit() {
    console.log("FileUploadComponent: onSubmit");
    // const fd = new FormData();
    // for (let singleFile of this.selectedFiles) {
    //   fd.append('files', singleFile, singleFile.name);
    // }
    // fd.append(this.formDataKey, this.formDataValue);
    // this.fileUploadService.uploadFile(fd).subscribe(res => {
    //
    // });
  }



}


