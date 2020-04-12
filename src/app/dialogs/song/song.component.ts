import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MidiService } from 'src/app/services/midi.service';
import { Song } from 'src/app/shared/song';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  song: Song;
  songName: string;
  url: string;
  correct: boolean;
  wrong: boolean;

  constructor(public dialogRef: MatDialogRef<SongComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private midiService: MidiService,
              private router: Router,
              private dialog: MatDialog) {
    this.song = data.song;
    this.songName = data.song.name;
    this.correct = false;
    this.wrong = false;
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.midiService.onMidiInit();
  }

  refresh() {
    // tslint:disable-next-line: deprecation
    location.reload(true);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/Play']);
    });
    this.dialog.closeAll();
  }
}
