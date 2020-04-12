import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { Song } from 'src/app/shared/song';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SongComponent } from '../dialogs/song/song.component';
import { MidiService } from '../services/midi.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  songNames: string[];
  chords: Array<{chord: number[]}> = [];
  urls: string[];
  songs: Song[];
  song: Song;
  songName: string;

  constructor(private fileService: FileService,
              public dialog: MatDialog,
              private midiService: MidiService) { }

  ngOnInit() {
    this.fileService.getSongs().subscribe(data => {
      this.songs = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Song;
      });
    });
  }

  selectSong(index: number) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.songs.length; i++) {
      if (i === index) {
        this.song = {name: this.songs[i].name, chords: this.songs[i].chords, urls: this.songs[i].urls};
      }
    }

    this.chords = this.song.chords;
    console.log(this.chords);

    this.songName = this.song.name;
    this.urls = this.song.urls;
    this.midiService.setSong(this.chords, this.urls);

    this.midiService.turn = 0;

    const dialogRef = this.dialog.open(SongComponent, {
      data: {
        song: this.song
      },
      height: '600px',
      width: '1200px',
      panelClass: 'dialogBack',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.urls.push(result);
    });
  }

  update(song: Song) {
    this.fileService.updateSong(song);
  }

  deleteSong(song: Song) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.songs.length; i++) {
      if (this.songs[i] === song) {
        this.songs.splice(i, 1);
      }
    }

    this.fileService.deleteSong(song.name);
  }

}
