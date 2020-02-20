import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MidiService } from 'src/app/services/midi.service';
import { Song } from 'src/app/shared/song';
import { UrlService } from 'src/app/services/urls.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  song: Song;
  songName: string;
  url: string;
  timeStamp = (new Date().getTime());

  constructor(public dialogRef: MatDialogRef<SongComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private midiService: MidiService,
              private urlService: UrlService,
              private cdRef: ChangeDetectorRef) {
    this.song = data.song;
    this.songName = data.song.name;
  }

  ngOnInit() {
    this.midiService.onMidiInit();
  }

  getImage() {
    this.urlService.image$.
         subscribe(image => this.url = image);
    return this.url;
  }

}
