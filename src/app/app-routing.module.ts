import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './sprint/edit/edit.component';
import { SprintsComponent } from './sprint/sprints/sprints.component';

const routes: Routes = [
  {path: 'sprint/sprints', component: SprintsComponent},
  {path: 'sprint/edit/:id', component: EditComponent},
  {path: '', redirectTo:'sprint/edit/1', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
