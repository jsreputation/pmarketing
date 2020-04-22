import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SurveyModule as PerxSurveyModule,
  CampaignModule as PerxCampaignModule,
  ConfigModule,
  AuthenticationModule,
  // SurveyService
} from '@perxtech/core';

import { SurveyRoutingModule } from './survey-routing.module';
import {
  MatCardModule,
  MatButtonModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatRadioModule,
  MatCheckboxModule
} from '@angular/material';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
// import { of } from 'rxjs';
// import { survey } from '../mock/survey.mock';

// const surveyServiceStub = {
//   getSurveyFromCampaign: () => of(survey)
// };

@NgModule({
  imports: [
    ConfigModule.forChild(),
    PerxBlackcombPagesModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    SurveyRoutingModule,
    PerxCampaignModule,
    PerxSurveyModule,
    AuthenticationModule
  ],
  providers: [
    // { provide: SurveyService, useValue: surveyServiceStub }
  ]
})
export class SurveyModule { }
