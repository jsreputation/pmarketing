import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyModule as PerxSurveyModule } from '@perx/core';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { MatCardModule, MatButtonModule, MatProgressBarModule, MatDatepickerModule, MatRadioModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [SurveyComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    SurveyRoutingModule,
    PerxSurveyModule
  ]
})
export class SurveyModule { }
