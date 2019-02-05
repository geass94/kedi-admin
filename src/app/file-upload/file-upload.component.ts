import {Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
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
  formDataKey: string;
  formDataValue: any;
  mode = 'determinate';
  value = 0;
  uploadFinished = false;

  selectedFiles: File[] = [];
  @Output() fileUploaderCallback = new EventEmitter<string>();

  @ViewChild('uploadForm') uploadForm: NgForm;

  constructor(private fileUploadService: FileUploadService, private des: DataExchangeService) { }

  ngOnInit() {

  }

  resetUploader() {
    this.fileUploadForm.reset();
    this.selectedFiles = [];
    this.formDataKey = '';
    this.formDataValue = null;
    this.mode = 'determinate';
    this.value = 0;
    this.uploadFinished = false;
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
    this.mode = 'indeterminate';
    const fd = new FormData();
    for (let singleFile of this.selectedFiles) {
      fd.append('files', singleFile, singleFile.name);
    }
    fd.append(this.formDataKey, this.formDataValue);
    this.fileUploadService.uploadFile(fd).subscribe((res) => {
        // upload successful
      },
      (error) => {
        console.log("Upload error: ", error);
      },
      () => {
        this.mode = 'determinate';
        this.value = 100;
        this.uploadFinished = true;
      });
  }



}


