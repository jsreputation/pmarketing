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

@NgModule({
  declarations: [NewSurveyQuestionsPageComponent, NewSurveyAppearancePageComponent, NewSurveyRewardsPageComponent, NewSurveyComponent],
  imports: [
    CommonModule,
    NewSurveyRoutingModule,
    QuestionTypeModule,
    ReactiveFormsModule,
    ButtonModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class NewSurveyModule { }
