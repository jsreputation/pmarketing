import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { ICampaignService } from '../campaign/icampaign.service';
import { Config } from '../config/config';
import { QuizLongTextComponent } from './question/long-text/long-text.component';
import { QuizPictureSelectComponent } from './question/picture-select/picture-select.component';
import { QuizQuestionComponent } from './question/question.component';
import { QuizRatingComponent } from './question/rating/rating.component';
import { QuizSelectComponent } from './question/select/select.component';
import { V4QuizService } from './v4-quiz.service';
import { QuizComponent } from './quiz/quiz.component';
import { QuizService } from './quiz.service';

export function quizServiceFactory(http: HttpClient, campaignService: ICampaignService, config: Config): QuizService {
  // Make decision on what to instantiate base on config
  return new V4QuizService(http, campaignService, config);
}

const components = [
  QuizComponent,
  QuizQuestionComponent,
  QuizRatingComponent,
  QuizPictureSelectComponent,
  QuizLongTextComponent,
  QuizSelectComponent,
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [
    {
      provide: QuizService,
      useFactory: quizServiceFactory,
      deps: [HttpClient, ICampaignService, Config]
    }
  ],
  exports: [
    ...components
  ]
})
export class QuizModule {
}
