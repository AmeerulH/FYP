import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './main-page/main-page.component';
import { MaterialModule } from './shared/material.module';
import { MidiService } from './services/midi.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FileService } from './services/file.service';
import { FileSizePipe } from './main-page/pipe/file-size.pipe';
import { EditorPageComponent } from './editor-page/editor-page.component';
import { CreatorComponent } from './creator/creator.component';
import { PlayComponent } from './play/play.component';
import { ChoosePhotoComponent } from './dialogs/choose-photo/choose-photo.component';
import { SongsListComponent } from './services/songs-list/songs-list.component';
import { SongComponent } from './dialogs/song/song.component';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    FileSizePipe,
    EditorPageComponent,
    CreatorComponent,
    PlayComponent,
    ChoosePhotoComponent,
    SongsListComponent,
    SongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    DeferLoadModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MidiService,
    FileService,
    { provide: StorageBucket, useValue: 'fyp-muzicodes.appspot.com' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ChoosePhotoComponent,
    SongComponent
 ]
})
export class AppModule { }
