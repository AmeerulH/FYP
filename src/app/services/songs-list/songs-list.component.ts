import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { Song } from 'src/app/shared/song';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {
  songs: Song[];

  constructor(private fileService: FileService) { }

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

  create(song: Song) {
    this.fileService.createSong(song);
  }

  update(song: Song) {
    this.fileService.updateSong(song);
  }

  delete(name: string) {
    this.fileService.deleteSong(name);
  }

}
