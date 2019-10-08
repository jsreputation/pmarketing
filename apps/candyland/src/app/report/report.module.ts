import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SurveyComponent } from './containers/survey/survey.component';
import { StampComponent } from './containers/stamp/stamp.component';
import { ReportHeaderComponent } from './components/report-header/report-header.component';
import { ButtonModule, ChartCardModule, CustomLineProgressModule } from '@cl-shared';
import { MatCardModule } from '@angular/material';
import { ReportLinearGraphicComponent } from './components/report-linear-graphic/report-linear-graphic.component';
import { SingleReportCardComponent } from './components/single-report-card/single-report-card.component';

@NgModule({
  declarations: [
    SurveyComponent,
    StampComponent,
    ReportHeaderComponent,
    ReportLinearGraphicComponent,
    SingleReportCardComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    ButtonModule,
    CustomLineProgressModule,
    ChartCardModule,

    MatCardModule,
  ]
})
export class ReportModule { }
