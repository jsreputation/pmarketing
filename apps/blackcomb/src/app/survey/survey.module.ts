import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyModule as PerxSurveyModule, SurveyService } from '@perx/core';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { MatCardModule, MatButtonModule, MatProgressBarModule, MatDatepickerModule } from '@angular/material';
import { of } from 'rxjs';
import { survey } from '../mock/survey.mock';

const surveyServiceStub = {
  // @ts-ignore
  getSurvey: (id: number) => of(survey)
};

@NgModule({
  declarations: [SurveyComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDatepickerModule,
    SurveyRoutingModule,
    PerxSurveyModule
  ],
  providers: [
    { provide: SurveyService, useValue: surveyServiceStub },
  ]
})
export class SurveyModule { }
