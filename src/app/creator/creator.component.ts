import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FileService } from '../services/file.service';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUpload } from '../shared';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChoosePhotoComponent } from '../dialogs/choose-photo/choose-photo.component';
import { Song } from '../shared/song';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {
  numChords: number[] = [];
  chords: string[] = [];
  chordsMIDI: number[] = [];
  songName: string;
  currentUpload: FileUpload;
  images: string[];
  imageNames: string[];
  urls: Array<{url: string}> = [];
  urlsFinal: string[] = [];
  songs: Song[];
  song: Song;

  constructor(private fileService: FileService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.images = fileService.getAllImages();
    this.imageNames = fileService.getAllImageNames();
  }

  ngOnInit() {}

  create(song: Song) {
    this.fileService.createSong(song);
  }

  update(song: Song) {
    this.fileService.updateSong(song);
  }

  delete(name: string) {
    this.fileService.deleteSong(name);
  }

  saveData(songName: string) {
    songName = (document.getElementById('name') as HTMLInputElement).value;
    for (let i = 0; i < this.urls.length; i++) {
      this.urlsFinal[i] = this.urls[i].url;
    }

    this.song = {name: songName, chords: this.chordsMIDI, urls: this.urlsFinal};

    this.fileService.createSong(this.song);
    console.log(this.song);
  }

  displayChords(amount: string) {
    amount = (document.getElementById('chords') as HTMLInputElement).value;
    const chordAmount = +amount;
    const chords: number[] = [];

    for (let index = 0; index < chordAmount; index++) {
      chords[index] = index;
    }
    this.numChords = chords;
  }

  choosePhoto() {
    const dialogRef = this.dialog.open(ChoosePhotoComponent, {
      data: {
        images: this.images,
        imageNames: this.imageNames
      },
      height: '600px',
      width: '1200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.urls.push(result);
    });
  }

  enterChordsButton(chord: string) {
    const chords: string[] = [];
    for (let i = 0; i < this.numChords.length; i++) {
      chord = (document.getElementById(i.toString()) as HTMLInputElement).value;
      chords[i] = chord;
    }

    this.chords = chords;

    for (let i = 0; i < this.chords.length; i++) {
      switch (this.chords[i]) {
          case 'A0':
            this.chordsMIDI[i] = 21;
            break;
          case 'A#0':
            this.chordsMIDI[i] = 22;
            break;
          case 'Bb0':
            this.chordsMIDI[i] = 22;
            break;
          case 'B0':
            this.chordsMIDI[i] = 23;
            break;
          case 'C1':
            this.chordsMIDI[i] = 24;
            break;
          case 'C#1':
            this.chordsMIDI[i] = 25;
            break;
          case 'Db1':
            this.chordsMIDI[i] = 25;
            break;
          case 'D1':
            this.chordsMIDI[i] = 26;
            break;
          case 'D#1':
            this.chordsMIDI[i] = 27;
            break;
          case 'Eb1':
            this.chordsMIDI[i] = 27;
            break;
          case 'E1':
            this.chordsMIDI[i] = 28;
            break;
          case 'F1':
            this.chordsMIDI[i] = 29;
            break;
          case 'F#1':
            this.chordsMIDI[i] = 30;
            break;
          case 'Gb1':
            this.chordsMIDI[i] = 30;
            break;
          case 'G1':
            this.chordsMIDI[i] = 31;
            break;
          case 'G#1':
            this.chordsMIDI[i] = 32;
            break;
          case 'Ab1':
            this.chordsMIDI[i] = 32;
            break;
          case 'A1':
            this.chordsMIDI[i] = 33;
            break;
          case 'A#1':
            this.chordsMIDI[i] = 34;
            break;
          case 'Bb1':
            this.chordsMIDI[i] = 34;
            break;
          case 'B1':
            this.chordsMIDI[i] = 35;
            break;
          case 'C2':
            this.chordsMIDI[i] = 36;
            break;
          case 'C#2':
            this.chordsMIDI[i] = 37;
            break;
          case 'Db2':
            this.chordsMIDI[i] = 37;
            break;
          case 'D2':
            this.chordsMIDI[i] = 38;
            break;
          case 'D#2':
            this.chordsMIDI[i] = 39;
            break;
          case 'Eb2':
            this.chordsMIDI[i] = 39;
            break;
          case 'E2':
            this.chordsMIDI[i] = 40;
            break;
          case 'F2':
            this.chordsMIDI[i] = 41;
            break;
          case 'F#2':
            this.chordsMIDI[i] = 42;
            break;
          case 'Gb2':
            this.chordsMIDI[i] = 42;
            break;
          case 'G2':
            this.chordsMIDI[i] = 43;
            break;
          case 'G#2':
            this.chordsMIDI[i] = 44;
            break;
          case 'Ab2':
            this.chordsMIDI[i] = 44;
            break;
          case 'A2':
            this.chordsMIDI[i] = 45;
            break;
          case 'A#2':
            this.chordsMIDI[i] = 46;
            break;
          case 'Bb2':
            this.chordsMIDI[i] = 46;
            break;
          case 'B2':
            this.chordsMIDI[i] = 47;
            break;
          case 'C3':
            this.chordsMIDI[i] = 48;
            break;
          case 'C#3':
            this.chordsMIDI[i] = 49;
            break;
          case 'Db3':
            this.chordsMIDI[i] = 49;
            break;
          case 'D3':
            this.chordsMIDI[i] = 50;
            break;
          case 'D#3':
            this.chordsMIDI[i] = 51;
            break;
          case 'Eb3':
            this.chordsMIDI[i] = 51;
            break;
          case 'E3':
            this.chordsMIDI[i] = 52;
            break;
          case 'F3':
            this.chordsMIDI[i] = 53;
            break;
          case 'F#3':
            this.chordsMIDI[i] = 54;
            break;
          case 'Gb3':
            this.chordsMIDI[i] = 54;
            break;
          case 'G3':
            this.chordsMIDI[i] = 55;
            break;
          case 'G#3':
            this.chordsMIDI[i] = 56;
            break;
          case 'Ab3':
            this.chordsMIDI[i] = 56;
            break;
          case 'A3':
            this.chordsMIDI[i] = 57;
            break;
          case 'A#3':
            this.chordsMIDI[i] = 58;
            break;
          case 'Bb3':
            this.chordsMIDI[i] = 58;
            break;
          case 'B3':
            this.chordsMIDI[i] = 59;
            break;
          case 'C4':
            this.chordsMIDI[i] = 60;
            break;
          case 'C#4':
            this.chordsMIDI[i] = 61;
            break;
          case 'Db4':
            this.chordsMIDI[i] = 61;
            break;
          case 'D4':
            this.chordsMIDI[i] = 62;
            break;
          case 'D#4':
            this.chordsMIDI[i] = 63;
            break;
          case 'Eb4':
            this.chordsMIDI[i] = 63;
            break;
          case 'E4':
            this.chordsMIDI[i] = 64;
            break;
          case 'F4':
            this.chordsMIDI[i] = 65;
            break;
          case 'F#4':
            this.chordsMIDI[i] = 66;
            break;
          case 'Gb4':
            this.chordsMIDI[i] = 66;
            break;
          case 'G4':
            this.chordsMIDI[i] = 67;
            break;
          case 'G#4':
            this.chordsMIDI[i] = 68;
            break;
          case 'Ab4':
            this.chordsMIDI[i] = 68;
            break;
          case 'A4':
            this.chordsMIDI[i] = 69;
            break;
          case 'A#4':
            this.chordsMIDI[i] = 70;
            break;
          case 'Bb4':
            this.chordsMIDI[i] = 70;
            break;
          case 'B4':
            this.chordsMIDI[i] = 71;
            break;
          case 'C5':
            this.chordsMIDI[i] = 72;
            break;
          case 'C#5':
            this.chordsMIDI[i] = 73;
            break;
          case 'Db5':
            this.chordsMIDI[i] = 73;
            break;
          case 'D5':
            this.chordsMIDI[i] = 74;
            break;
          case 'D#5':
            this.chordsMIDI[i] = 75;
            break;
          case 'Eb5':
            this.chordsMIDI[i] = 75;
            break;
          case 'E5':
            this.chordsMIDI[i] = 76;
            break;
          case 'F5':
            this.chordsMIDI[i] = 77;
            break;
          case 'F#5':
            this.chordsMIDI[i] = 78;
            break;
          case 'Gb5':
            this.chordsMIDI[i] = 78;
            break;
          case 'G5':
            this.chordsMIDI[i] = 79;
            break;
          case 'G#5':
            this.chordsMIDI[i] = 80;
            break;
          case 'Ab5':
            this.chordsMIDI[i] = 80;
            break;
          case 'A5':
            this.chordsMIDI[i] = 81;
            break;
          case 'A#5':
            this.chordsMIDI[i] = 82;
            break;
          case 'Bb5':
            this.chordsMIDI[i] = 82;
            break;
          case 'B5':
            this.chordsMIDI[i] = 83;
            break;
          case 'C6':
            this.chordsMIDI[i] = 84;
            break;
          case 'C#6':
            this.chordsMIDI[i] = 85;
            break;
          case 'Db6':
            this.chordsMIDI[i] = 85;
            break;
          case 'D6':
            this.chordsMIDI[i] = 86;
            break;
          case 'D#6':
            this.chordsMIDI[i] = 87;
            break;
          case 'Eb6':
            this.chordsMIDI[i] = 87;
            break;
          case 'E6':
            this.chordsMIDI[i] = 88;
            break;
          case 'F6':
            this.chordsMIDI[i] = 89;
            break;
          case 'F#6':
            this.chordsMIDI[i] = 90;
            break;
          case 'Gb6':
            this.chordsMIDI[i] = 90;
            break;
          case 'G6':
            this.chordsMIDI[i] = 91;
            break;
          case 'G#6':
            this.chordsMIDI[i] = 92;
            break;
          case 'Ab6':
            this.chordsMIDI[i] = 92;
            break;
          case 'A6':
            this.chordsMIDI[i] = 93;
            break;
          case 'A#6':
            this.chordsMIDI[i] = 94;
            break;
          case 'Bb6':
            this.chordsMIDI[i] = 94;
            break;
          case 'B6':
            this.chordsMIDI[i] = 95;
            break;
          case 'C7':
            this.chordsMIDI[i] = 96;
            break;
          case 'C#7':
            this.chordsMIDI[i] = 97;
            break;
          case 'Db7':
            this.chordsMIDI[i] = 97;
            break;
          case 'D7':
            this.chordsMIDI[i] = 98;
            break;
          case 'D#7':
            this.chordsMIDI[i] = 99;
            break;
          case 'Eb7':
            this.chordsMIDI[i] = 99;
            break;
          case 'E7':
            this.chordsMIDI[i] = 100;
            break;
          case 'F7':
            this.chordsMIDI[i] = 101;
            break;
          case 'F#7':
            this.chordsMIDI[i] = 102;
            break;
          case 'Gb7':
            this.chordsMIDI[i] = 102;
            break;
          case 'G7':
            this.chordsMIDI[i] = 103;
            break;
          case 'G#7':
            this.chordsMIDI[i] = 104;
            break;
          case 'Ab7':
            this.chordsMIDI[i] = 104;
            break;
          case 'A7':
            this.chordsMIDI[i] = 105;
            break;
          case 'A#7':
            this.chordsMIDI[i] = 106;
            break;
          case 'Bb7':
            this.chordsMIDI[i] = 106;
            break;
          case 'B7':
            this.chordsMIDI[i] = 107;
            break;
          case 'C8':
            this.chordsMIDI[i] = 108;
            break;
          case 'C#8':
            this.chordsMIDI[i] = 109;
            break;
          case 'Db8':
            this.chordsMIDI[i] = 109;
            break;
          case 'D8':
            this.chordsMIDI[i] = 110;
            break;
          case 'D#8':
            this.chordsMIDI[i] = 111;
            break;
          case 'Eb8':
            this.chordsMIDI[i] = 111;
            break;
          case 'E8':
            this.chordsMIDI[i] = 112;
            break;
          case 'F8':
            this.chordsMIDI[i] = 113;
            break;
          case 'F#8':
            this.chordsMIDI[i] = 114;
            break;
          case 'Gb8':
            this.chordsMIDI[i] = 114;
            break;
          case 'G8':
            this.chordsMIDI[i] = 115;
            break;
          case 'G#8':
            this.chordsMIDI[i] = 116;
            break;
          case 'Ab8':
            this.chordsMIDI[i] = 116;
            break;
          case 'A8':
            this.chordsMIDI[i] = 117;
            break;
          case 'A#8':
            this.chordsMIDI[i] = 118;
            break;
          case 'Bb8':
            this.chordsMIDI[i] = 118;
            break;
          case 'B8':
            this.chordsMIDI[i] = 119;
            break;
          case 'C9':
            this.chordsMIDI[i] = 120;
            break;
          case 'C#9':
            this.chordsMIDI[i] = 121;
            break;
          case 'Db9':
            this.chordsMIDI[i] = 121;
            break;
          case 'D9':
            this.chordsMIDI[i] = 122;
            break;
          case 'D#9':
            this.chordsMIDI[i] = 123;
            break;
          case 'Eb9':
            this.chordsMIDI[i] = 123;
            break;
          case 'E9':
            this.chordsMIDI[i] = 124;
            break;
          case 'F9':
            this.chordsMIDI[i] = 125;
            break;
          case 'F#9':
            this.chordsMIDI[i] = 126;
            break;
          case 'Gb9':
            this.chordsMIDI[i] = 126;
            break;
          case 'G9':
            this.chordsMIDI[i] = 127;
            break;
          case 'G#9':
            this.chordsMIDI[i] = 128;
            break;
          case 'Ab9':
            this.chordsMIDI[i] = 128;
            break;
      }
    }

    console.log('Chords: ' + this.chordsMIDI);
  }

}
