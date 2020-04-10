import { CommonModule } from '@angular/common';
import { EventEmitter, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateService } from '@ngx-translate/core';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { QuizModule as CoreQuizModule, QuizService } from '@perxtech/core';
import { of } from 'rxjs';
import { quiz } from './mock';
import { QuizCoreComponent } from './quiz-core/quiz-core.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { ResultsComponent } from './results/results.component';

const mockQuizService: Partial<QuizService> = {
  getQuizFromCampaign: () => of(quiz)
};
const mockTranslateService: Partial<TranslateService> = {
  get: () => of('TODO'),
  onTranslationChange: new EventEmitter(),
  onLangChange: new EventEmitter(),
  onDefaultLangChange: new EventEmitter()
};

@NgModule({
  declarations: [QuizComponent, QuizCoreComponent, ResultsComponent],
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
  ]
})
export class QuizModule { }
