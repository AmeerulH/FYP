import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MidiService } from '../services/midi.service';
import { FileService } from '../services/file.service';
import { FileUpload } from '../shared/fileUpload';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.css']
})
export class EditorPageComponent implements OnInit {
  selectedFiles: FileList;
  currentUpload: FileUpload;
  images: string[];
  imageNames: string[];

  constructor(private fileService: FileService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.images = this.fileService.getAllImages();
    this.imageNames = this.fileService.getAllImageNames();
  }

  ngOnInit() {}

  detectFiles(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new FileUpload(file);
    this.fileService.pushUpload(this.currentUpload);
    this.uploadSnackBar();
    this.images = this.fileService.getAllImages();
    this.imageNames = this.fileService.getAllImageNames();
  }

  uploadMulti() {
    const files = this.selectedFiles;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new FileUpload(files[idx]);
      this.fileService.pushUpload(this.currentUpload);
    });
  }

  deleteImage(url: string, imageName: string) {
    this.fileService.deleteImage(url);
    for (let i = 0; i < this.imageNames.length; i++) {
      if (this.imageNames[i] === imageName) {
        this.imageNames.splice(i, 1);
        this.images.splice(i, 1);
      }
    }
    this.deleteSnackBar();
    this.images = this.fileService.getAllImages();
    this.imageNames = this.fileService.getAllImageNames();
  }

  deleteSnackBar() {
    this.snackBar.open('Image has been deleted', 'Close', {
      duration: 2000,
    });
  }

  uploadSnackBar() {
    this.snackBar.open('Image has been uploaded', 'Close', {
      duration: 2000,
    });
  }
}
