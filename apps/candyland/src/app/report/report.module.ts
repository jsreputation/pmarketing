import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SurveyComponent } from './containers/survey/survey.component';
import { StampComponent } from './containers/stamp/stamp.component';
import { ReportHeaderComponent } from './components/report-header/report-header.component';
import { ChartCardModule, QuestionTypeModule } from '@cl-shared';
import { ButtonModule } from '@perxtech/candyshop';
import { MatCardModule } from '@angular/material';
import { ReportLinearGraphicComponent } from './components/report-linear-graphic/report-linear-graphic.component';
import { SingleReportCardComponent } from './components/single-report-card/single-report-card.component';
import { RatingGraphicComponent } from './components/rating-graphic/rating-graphic.component';
import { VerticalGraphicElementComponent } from './components/vertical-graphic-element/vertical-graphic-element.component';
import { PictureChoiceGraphicComponent } from './components/picture-choice-graphic/picture-choice-graphic.component';
import { DynamicGraphicDirective } from './components/single-report-card/shared/dynamic-graphic.directive';
import { MultipleChoiceGraphicComponent } from './components/multiple-choice-graphic/multiple-choice-graphic.component';
import { LongTextGraphicComponent } from './components/long-text-graphic/long-text-graphic.component';
import { QuestionGroupGraphicComponent } from './components/question-group-graphic/question-group-graphic.component';
import { CustomLineProgressModule } from '@perxtech/candyshop';

@NgModule({
  declarations: [
    SurveyComponent,
    StampComponent,
    ReportHeaderComponent,
    ReportLinearGraphicComponent,
    SingleReportCardComponent,
    RatingGraphicComponent,
    VerticalGraphicElementComponent,
    PictureChoiceGraphicComponent,
    DynamicGraphicDirective,
    MultipleChoiceGraphicComponent,
    LongTextGraphicComponent,
    QuestionGroupGraphicComponent,

  ],
  entryComponents: [
    RatingGraphicComponent,
    PictureChoiceGraphicComponent,
    MultipleChoiceGraphicComponent,
    LongTextGraphicComponent,
    QuestionGroupGraphicComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    ButtonModule,
    CustomLineProgressModule,
    ChartCardModule,
    QuestionTypeModule,

    MatCardModule,
  ]
})
export class ReportModule { }
