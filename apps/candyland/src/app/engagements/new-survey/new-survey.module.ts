import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSurveyRoutingModule } from './new-survey-routing.module';
import { NewSurveyQuestionsPageComponent } from './containers/new-survey-questions-page/new-survey-questions-page.component';
import { NewSurveyAppearancePageComponent } from './containers/new-survey-appearance-page/new-survey-appearance-page.component';
import { NewSurveyRewardsPageComponent } from './containers/new-survey-rewards-page/new-survey-rewards-page.component';
import {NewSurveyComponent} from './containers/new-survey/new-survey.component';
import { QuestionTypeModule } from '@cl-shared/components/question-type/question-type.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { QuestionFormFieldModule } from '@cl-shared/components/question-form-field/question-form-field.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';

@NgModule({
  declarations: [NewSurveyQuestionsPageComponent, NewSurveyAppearancePageComponent, NewSurveyRewardsPageComponent, NewSurveyComponent],
  imports: [
    CommonModule,
    NewSurveyRoutingModule,
    QuestionTypeModule,
    ReactiveFormsModule,
    ButtonModule,
    QuestionFormFieldModule,
    SelectGraphicWrapModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    DragDropModule,
  ]
})
export class NewSurveyModule { }
