import * as firebase from 'firebase';
import { FileUpload } from '../shared/fileUpload';
import { Song } from '../shared/song';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseListObservable } from '@angular/fire/database-deprecated';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()

export class FileService {
  constructor(private af: AngularFireModule,
              private db: AngularFireDatabase,
              private storage: AngularFireStorage,
              private firestore: AngularFirestore) { }

  private basePath = '/uploads';
  private dataPath = '/songs';
  uploads: FirebaseListObservable<FileUpload[]>;

  pushUpload(fileUpload: FileUpload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        fileUpload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        fileUpload.url = uploadTask.snapshot.ref.getDownloadURL().toString();
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload);
      }
    );
  }

  pushSongUpload(fileUpload: FileUpload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.dataPath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        fileUpload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        fileUpload.name = fileUpload.file.name;
        this.saveSongData(fileUpload);
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(fileUpload: FileUpload) {
    this.db.list(`${this.basePath}/`).push(fileUpload);
  }

  private saveSongData(fileUpload: FileUpload) {
    this.db.list(`${this.dataPath}/`).push(fileUpload);
  }

  getSongs() {
    return this.firestore.collection('songs').snapshotChanges();
  }

  createSong(song: Song) {
    return this.firestore.collection('songs').doc(song.name).set({
      name: song.name,
      chords: song.chords,
      urls: song.urls
    });
    // return this.firestore.collection('songs').add(song);
  }

  updateSong(song: Song) {
    delete song.name;
    this.firestore.doc('songs/' + song.name).update(song);
  }

  deleteSong(songName: string) {
    this.firestore.doc('songs/' + songName).delete();
  }

  getAllImages() {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imagesRef = storageRef.child('uploads');
    const images: string[] = [];

    imagesRef.listAll().then((res) => {
      res.items.forEach((element, i) => {
        element.getDownloadURL().then( value =>
          images[i] = value
        );
      });
    });

    return images;
  }

  getAllImageNames() {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imagesRef = storageRef.child('uploads');
    const images: string[] = [];

    imagesRef.listAll().then((res) => {
      res.items.forEach((element, i) => {
        element.getMetadata().then(
          value => images[i] = value.name
        );
      });
    });

    return images;
  }

  getSongName() {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const songsRef = storageRef.child('songs');
    const songNames: string[] = [];

    songsRef.listAll().then((res) => {
      res.items.forEach((element, i) => {
        element.getMetadata().then(
          value => songNames[i] = value.name
        );
      });
    });

    return songNames;
  }

  deleteImage(url: string) {
    return this.storage.storage.refFromURL(url).delete();
  }
}
