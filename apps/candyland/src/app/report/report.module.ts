import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SurveyComponent } from './containers/survey/survey.component';
import { StampComponent } from './containers/stamp/stamp.component';
import { ReportHeaderComponent } from './components/report-header/report-header.component';
import { ButtonModule } from '@cl-shared';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    SurveyComponent,
    StampComponent,
    ReportHeaderComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    ButtonModule,

    MatCardModule,
  ]
})
export class ReportModule { }
