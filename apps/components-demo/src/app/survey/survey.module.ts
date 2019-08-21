import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey.component';
import { SurveyModule as PerxSurveyMOdule } from '@perx/core';

@NgModule({
  declarations: [SurveyComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SurveyRoutingModule,
    PerxSurveyMOdule
  ]
})
export class SurveyModule { }
