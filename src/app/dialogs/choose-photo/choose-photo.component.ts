import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-choose-photo',
  templateUrl: './choose-photo.component.html',
  styleUrls: ['./choose-photo.component.css']
})
export class ChoosePhotoComponent implements OnInit {
  images: string[];
  imageNames: string[];

  constructor(public dialogRef: MatDialogRef<ChoosePhotoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              fileService: FileService) {
    this.images = fileService.getAllImages();
    this.imageNames = fileService.getAllImageNames();
  }

  ngOnInit() {}

  select(image: string) {
    this.dialogRef.close({url: image});
  }

}
