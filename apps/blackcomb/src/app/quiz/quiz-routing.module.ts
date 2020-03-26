import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: QuizComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
