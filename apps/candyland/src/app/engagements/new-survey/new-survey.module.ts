import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSurveyRoutingModule } from './new-survey-routing.module';
import {NewSurveyComponent} from './containers/new-survey/new-survey.component';
import { QuestionTypeModule } from '@cl-shared/questions/question-type/question-type.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { QuestionFormFieldModule } from '@cl-shared/questions/question-form-field/question-form-field.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import { SimpleMobileViewModule } from '@cl-shared';
import { SurveyModule as PerxSurveyModule} from '@perx/core';
@NgModule({
  declarations: [
    NewSurveyComponent
  ],
  imports: [
    CommonModule,
    NewSurveyRoutingModule,
    QuestionTypeModule,
    ReactiveFormsModule,
    ButtonModule,
    QuestionFormFieldModule,
    SelectGraphicWrapModule,
    SimpleMobileViewModule,
    PerxSurveyModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    DragDropModule,
  ]
})
export class NewSurveyModule { }
