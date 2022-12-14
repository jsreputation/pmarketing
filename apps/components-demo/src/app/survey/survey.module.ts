import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyModule as PerxSurveyModule } from '@perxtech/core';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SurveyComponent],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    HttpClientModule,
    PerxSurveyModule,
    MatButtonModule
  ]
})
export class SurveyModule { }
