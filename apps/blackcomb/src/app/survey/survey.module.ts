import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [SurveyComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    SurveyRoutingModule
  ]
})
export class SurveyModule { }
