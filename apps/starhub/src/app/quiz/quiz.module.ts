import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  QuizModule,
  QuizComponent
} from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: QuizComponent
}];

@NgModule({
  imports: [
    QuizModule,
    RouterModule.forChild(routes),
  ]
})
export class SHQuizModule { }
