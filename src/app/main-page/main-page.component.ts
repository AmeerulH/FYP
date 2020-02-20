import { Component, OnInit } from '@angular/core';
import { MidiService } from '../services/midi.service';
import { FileService } from '../services/file.service';
import { FileUpload } from '../shared/fileUpload';
import * as _ from 'lodash';
import * as firebase from 'firebase';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  selectedFiles: FileList;
  currentUpload: FileUpload;
  bool = true;

  constructor(private fileService: FileService,
              private midiService: MidiService) {
    midiService.onMidiInit();
  }

  ngOnInit() {}

  detectFiles(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new FileUpload(file);
    this.fileService.pushUpload(this.currentUpload);
  }

  uploadMulti() {
    const files = this.selectedFiles;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new FileUpload(files[idx]);
      this.fileService.pushUpload(this.currentUpload);
    });
  }

  getImage() {
    const userStorageRef = firebase.storage().ref().child;
  }
}
