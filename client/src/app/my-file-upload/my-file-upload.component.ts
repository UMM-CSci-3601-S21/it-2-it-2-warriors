import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-file-upload',
  templateUrl: './my-file-upload.component.html',
  styleUrls: ['./my-file-upload.component.scss']
})
export class MyFileUploadComponent implements OnInit {

  selectedFile: File;
  constructor() { }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    // upload code goes here
  }

  ngOnInit(): void {
  }

}
