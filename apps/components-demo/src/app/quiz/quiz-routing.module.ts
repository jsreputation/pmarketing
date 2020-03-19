import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizComponent } from './quiz.component';
import { QuizCoreComponent } from './quiz-core/quiz-core.component';
import { QuizComponent as QuizBcComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  {
    path: '', component: QuizComponent, children: [
      { path: '', redirectTo: 'core', pathMatch: 'full' },
      { path: 'core', component: QuizCoreComponent },
      { path: 'bc/:id', component: QuizBcComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
