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
  chords: Array<{chord: string[]}> = [];
  chordsMIDI: Array<{chord: number[]}> = [];
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
    const chords: Array<{chord: string}> = [];
    let temp: string[];
    let temp2: number[] = [];

    for (let i = 0; i < this.numChords.length; i++) {
      chord = (document.getElementById(i.toString()) as HTMLInputElement).value;
      chords.push({chord});
    }

    // tslint:disable-next-line: prefer-for-of
    for (let j = 0; j < chords.length; j++) {
      temp = chords[j].chord.split(',');
      this.chords.push({chord: temp});
    }

    console.log(this.chords);

    for (let i = 0; i < this.chords.length; i++) {
      temp2 = [];
      for (let j = 0; j < this.chords[i].chord.length; j++) {
        switch (this.chords[i].chord[j]) {
            case 'A0':
              temp2.push(21);
              break;
            case 'A#0':
              temp2.push(22);
              break;
            case 'Bb0':
              temp2.push(22);
              break;
            case 'B0':
              temp2.push(23);
              break;
            case 'C1':
              temp2.push(24);
              break;
            case 'C#1':
              temp2.push(25);
              break;
            case 'Db1':
              temp2.push(25);
              break;
            case 'D1':
              temp2.push(26);
              break;
            case 'D#1':
              temp2.push(27);
              break;
            case 'Eb1':
              temp2.push(27);
              break;
            case 'E1':
              temp2.push(28);
              break;
            case 'F1':
              temp2.push(29);
              break;
            case 'F#1':
              temp2.push(30);
              break;
            case 'Gb1':
              temp2.push(30);
              break;
            case 'G1':
              temp2.push(31);
              break;
            case 'G#1':
              temp2.push(32);
              break;
            case 'Ab1':
              temp2.push(32);
              break;
            case 'A1':
              temp2.push(33);
              break;
            case 'A#1':
              temp2.push(34);
              break;
            case 'Bb1':
              temp2.push(34);
              break;
            case 'B1':
              temp2.push(35);
              break;
            case 'C2':
              temp2.push(36);
              break;
            case 'C#2':
              temp2.push(37);
              break;
            case 'Db2':
              temp2.push(37);
              break;
            case 'D2':
              temp2.push(38);
              break;
            case 'D#2':
              temp2.push(39);
              break;
            case 'Eb2':
              temp2.push(39);
              break;
            case 'E2':
              temp2.push(40);
              break;
            case 'F2':
              temp2.push(41);
              break;
            case 'F#2':
              temp2.push(42);
              break;
            case 'Gb2':
              temp2.push(42);
              break;
            case 'G2':
              temp2.push(43);
              break;
            case 'G#2':
              temp2.push(44);
              break;
            case 'Ab2':
              temp2.push(44);
              break;
            case 'A2':
              temp2.push(45);
              break;
            case 'A#2':
              temp2.push(46);
              break;
            case 'Bb2':
              temp2.push(46);
              break;
            case 'B2':
              temp2.push(47);
              break;
            case 'C3':
              temp2.push(48);
              break;
            case 'C#3':
              temp2.push(49);
              break;
            case 'Db3':
              temp2.push(49);
              break;
            case 'D3':
              temp2.push(50);
              break;
            case 'D#3':
              temp2.push(51);
              break;
            case 'Eb3':
              temp2.push(51);
              break;
            case 'E3':
              temp2.push(52);
              break;
            case 'F3':
              temp2.push(53);
              break;
            case 'F#3':
              temp2.push(54);
              break;
            case 'Gb3':
              temp2.push(54);
              break;
            case 'G3':
              temp2.push(55);
              break;
            case 'G#3':
              temp2.push(56);
              break;
            case 'Ab3':
              temp2.push(56);
              break;
            case 'A3':
              temp2.push(57);
              break;
            case 'A#3':
              temp2.push(58);
              break;
            case 'Bb3':
              temp2.push(58);
              break;
            case 'B3':
              temp2.push(59);
              break;
            case 'C4':
              temp2.push(60);
              break;
            case 'C#4':
              temp2.push(61);
              break;
            case 'Db4':
              temp2.push(61);
              break;
            case 'D4':
              temp2.push(62);
              break;
            case 'D#4':
              temp2.push(63);
              break;
            case 'Eb4':
              temp2.push(63);
              break;
            case 'E4':
              temp2.push(64);
              break;
            case 'F4':
              temp2.push(65);
              break;
            case 'F#4':
              temp2.push(66);
              break;
            case 'Gb4':
              temp2.push(66);
              break;
            case 'G4':
              temp2.push(67);
              break;
            case 'G#4':
              temp2.push(68);
              break;
            case 'Ab4':
              temp2.push(68);
              break;
            case 'A4':
              temp2.push(69);
              break;
            case 'A#4':
              temp2.push(70);
              break;
            case 'Bb4':
              temp2.push(70);
              break;
            case 'B4':
              temp2.push(71);
              break;
            case 'C5':
              temp2.push(72);
              break;
            case 'C#5':
              temp2.push(73);
              break;
            case 'Db5':
              temp2.push(73);
              break;
            case 'D5':
              temp2.push(74);
              break;
            case 'D#5':
              temp2.push(75);
              break;
            case 'Eb5':
              temp2.push(75);
              break;
            case 'E5':
              temp2.push(76);
              break;
            case 'F5':
              temp2.push(77);
              break;
            case 'F#5':
              temp2.push(78);
              break;
            case 'Gb5':
              temp2.push(78);
              break;
            case 'G5':
              temp2.push(79);
              break;
            case 'G#5':
              temp2.push(80);
              break;
            case 'Ab5':
              temp2.push(80);
              break;
            case 'A5':
              temp2.push(81);
              break;
            case 'A#5':
              temp2.push(82);
              break;
            case 'Bb5':
              temp2.push(82);
              break;
            case 'B5':
              temp2.push(83);
              break;
            case 'C6':
              temp2.push(84);
              break;
            case 'C#6':
              temp2.push(85);
              break;
            case 'Db6':
              temp2.push(85);
              break;
            case 'D6':
              temp2.push(86);
              break;
            case 'D#6':
              temp2.push(87);
              break;
            case 'Eb6':
              temp2.push(87);
              break;
            case 'E6':
              temp2.push(88);
              break;
            case 'F6':
              temp2.push(89);
              break;
            case 'F#6':
              temp2.push(90);
              break;
            case 'Gb6':
              temp2.push(90);
              break;
            case 'G6':
              temp2.push(91);
              break;
            case 'G#6':
              temp2.push(92);
              break;
            case 'Ab6':
              temp2.push(92);
              break;
            case 'A6':
              temp2.push(93);
              break;
            case 'A#6':
              temp2.push(94);
              break;
            case 'Bb6':
              temp2.push(94);
              break;
            case 'B6':
              temp2.push(95);
              break;
            case 'C7':
              temp2.push(96);
              break;
            case 'C#7':
              temp2.push(97);
              break;
            case 'Db7':
              temp2.push(97);
              break;
            case 'D7':
              temp2.push(98);
              break;
            case 'D#7':
              temp2.push(99);
              break;
            case 'Eb7':
              temp2.push(99);
              break;
            case 'E7':
              temp2.push(100);
              break;
            case 'F7':
              temp2.push(101);
              break;
            case 'F#7':
              temp2.push(102);
              break;
            case 'Gb7':
              temp2.push(102);
              break;
            case 'G7':
              temp2.push(103);
              break;
            case 'G#7':
              temp2.push(104);
              break;
            case 'Ab7':
              temp2.push(104);
              break;
            case 'A7':
              temp2.push(105);
              break;
            case 'A#7':
              temp2.push(106);
              break;
            case 'Bb7':
              temp2.push(106);
              break;
            case 'B7':
              temp2.push(108);
              break;
            case 'C8':
              temp2.push(108);
              break;
            case 'C#8':
              temp2.push(109);
              break;
            case 'Db8':
              temp2.push(109);
              break;
            case 'D8':
              temp2.push(110);
              break;
            case 'D#8':
              temp2.push(111);
              break;
            case 'Eb8':
              temp2.push(111);
              break;
            case 'E8':
              temp2.push(112);
              break;
            case 'F8':
              temp2.push(113);
              break;
            case 'F#8':
              temp2.push(114);
              break;
            case 'Gb8':
              temp2.push(114);
              break;
            case 'G8':
              temp2.push(115);
              break;
            case 'G#8':
              temp2.push(116);
              break;
            case 'Ab8':
              temp2.push(116);
              break;
            case 'A8':
              temp2.push(117);
              break;
            case 'A#8':
              temp2.push(118);
              break;
            case 'Bb8':
              temp2.push(118);
              break;
            case 'B8':
              temp2.push(119);
              break;
            case 'C9':
              temp2.push(120);
              break;
            case 'C#9':
              temp2.push(121);
              break;
            case 'Db9':
              temp2.push(121);
              break;
            case 'D9':
              temp2.push(122);
              break;
            case 'D#9':
              temp2.push(123);
              break;
            case 'Eb9':
              temp2.push(123);
              break;
            case 'E9':
              temp2.push(124);
              break;
            case 'F9':
              temp2.push(125);
              break;
            case 'F#9':
              temp2.push(126);
              break;
            case 'Gb9':
              temp2.push(126);
              break;
            case 'G9':
              temp2.push(127);
              break;
            case 'G#9':
              temp2.push(128);
              break;
            case 'Ab9':
              temp2.push(128);
              break;
        }
      }
      this.chordsMIDI.push({chord: temp2});
    }

    console.log(this.chordsMIDI);
  }

}
