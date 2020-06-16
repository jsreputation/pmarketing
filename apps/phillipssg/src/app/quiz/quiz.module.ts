import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent, QuizModule as BCPQuizModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{ path: '', component: QuizComponent }];

@NgModule({
  imports: [
    BCPQuizModule,
    RouterModule.forChild(routes)
  ]
})
export class QuizModule { }
