import { NgModule } from '@angular/core';
import { QuizResultsComponent, QuizResultsModule } from '@perxtech/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: QuizResultsComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    QuizResultsModule,
  ]
})
export class SHQuizResultsModule { }
