import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizResultsComponent, QuizResultsModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{ path: '', component: QuizResultsComponent }];

@NgModule({
  imports: [
    QuizResultsModule,
    RouterModule.forChild(routes),
  ]
})
export class QuizResultModule { }
