import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSurveyRoutingModule } from './new-survey-routing.module';
import { NewSurveyQuestionsPageComponent } from './containers/new-survey-questions-page/new-survey-questions-page.component';
import { NewSurveyAppearancePageComponent } from './containers/new-survey-appearance-page/new-survey-appearance-page.component';
import { NewSurveyRewardsPageComponent } from './containers/new-survey-rewards-page/new-survey-rewards-page.component';
import {NewSurveyComponent} from './containers/new-survey/new-survey.component';

@NgModule({
  declarations: [NewSurveyQuestionsPageComponent, NewSurveyAppearancePageComponent, NewSurveyRewardsPageComponent, NewSurveyComponent],
  imports: [
    CommonModule,
    NewSurveyRoutingModule
  ]
})
export class NewSurveyModule { }
