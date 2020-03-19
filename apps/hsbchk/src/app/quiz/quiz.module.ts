import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from '@perxtech/blackcomb-pages';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { QuizService } from '@perxtech/core';
import { BehaviorSubject } from 'rxjs';
import { quiz } from '../mock/quiz.mock';

const routes: Routes = [{ path: '', component: QuizComponent }];
const quizServiceStub: Partial<QuizService> = {
  getQuizFromCampaign: () => new BehaviorSubject(quiz)
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: QuizService, useValue: quizServiceStub }
  ]
})
export class QuizModule { }
