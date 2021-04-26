import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyModule as PerxSurveyModule } from '@perxtech/core';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';

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
