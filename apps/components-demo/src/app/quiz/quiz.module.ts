import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { QuizModule as CoreQuizModule, QuizService, IQuiz } from '@perxtech/core';
import { QuizBcComponent } from './quiz-bc/quiz-bc.component';
import { QuizCoreComponent } from './quiz-core/quiz-core.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { BehaviorSubject } from 'rxjs';
import { quiz } from './mock';
import { ActivatedRoute } from '@angular/router';

const mockQuizService: Partial<QuizService> = {
  getQuizFromCampaign: () => new BehaviorSubject<IQuiz>(quiz)
}
const mockTranslateService: Partial<TranslateService> = {
  get: () => new BehaviorSubject<string>('TODO')
}
const mockActivatedRoute: Partial<ActivatedRoute> = {

}

@NgModule({
  declarations: [QuizComponent, QuizCoreComponent, QuizBcComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    CoreQuizModule,
    MatTabsModule,
    PerxBlackcombPagesModule,
  ],
  providers: [
    { provide: TranslateService, useValue: mockTranslateService },
    { provide: QuizService, useValue: mockQuizService },
    { provide: ActivatedRoute, useValue: mockActivatedRoute }
  ]
})
export class QuizModule { }
// private notificationService: NotificationService,
//     private router: Router,
//     private route: ActivatedRoute,
  //   private quizService: QuizService,
  // private translate: TranslateService,
    // private auth: AuthenticationService,