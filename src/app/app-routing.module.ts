import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { EditorPageComponent } from './editor-page/editor-page.component';
import { CreatorComponent } from './creator/creator.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'Home', component: MainPageComponent },
  { path: 'Editor', component: EditorPageComponent },
  { path: 'Create', component: CreatorComponent },
  { path: 'Play', component: PlayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
