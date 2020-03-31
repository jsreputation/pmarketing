import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent as QuizBcComponent, QuizResultsComponent } from '@perxtech/blackcomb-pages';
import { QuizCoreComponent } from './quiz-core/quiz-core.component';
import { QuizComponent } from './quiz.component';
import { ResultsComponent } from './results/results.component';
import { results } from './mock';

const routes: Routes = [
  {
    path: '', component: QuizComponent, children: [
      { path: '', redirectTo: 'core', pathMatch: 'full' },
      { path: 'core', component: QuizCoreComponent },
      { path: 'bc/:id', component: QuizBcComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'results-bc', component: QuizResultsComponent, data: { results } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
