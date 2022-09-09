import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './sprint/edit/edit.component';
import { SprintsComponent } from './sprint/sprints/sprints.component';

const routes: Routes = [
  {path: '', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
