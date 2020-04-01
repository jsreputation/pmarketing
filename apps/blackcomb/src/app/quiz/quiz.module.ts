import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  QuizModule as PerxQuizModule,
  CampaignModule as PerxCampaignModule,
  ConfigModule,
  AuthenticationModule,
  // SurveyService
} from '@perxtech/core';

import {
  MatCardModule,
  MatButtonModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatRadioModule,
  MatToolbarModule,
  MatCheckboxModule
} from '@angular/material';
import { environment } from 'src/environments/environment';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { QuizRoutingModule } from './quiz-routing.module';
// import { of } from 'rxjs';
// import { survey } from '../mock/survey.mock';

// const surveyServiceStub = {
//   getSurveyFromCampaign: () => of(survey)
// };

@NgModule({
  imports: [
    ConfigModule.forRoot({ ...environment }),
    PerxBlackcombPagesModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    QuizRoutingModule,
    PerxCampaignModule,
    PerxQuizModule,
    AuthenticationModule
  ],
  providers: [
    // { provide: SurveyService, useValue: surveyServiceStub }
  ]
})
export class QuizModule { }
