import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewSurveyComponent} from './containers/new-survey/new-survey.component';
import {NewSurveyQuestionsPageComponent} from './containers/new-survey-questions-page/new-survey-questions-page.component';
import {NewSurveyAppearancePageComponent} from './containers/new-survey-appearance-page/new-survey-appearance-page.component';
import {NewSurveyRewardsPageComponent} from './containers/new-survey-rewards-page/new-survey-rewards-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/questions'},
  { path: '',
    component: NewSurveyComponent,
    children: [
      {
        path: 'questions',
        component: NewSurveyQuestionsPageComponent
      },
      {
        path: 'appearance',
        component: NewSurveyAppearancePageComponent
      },
      {
        path: 'rewards',
        component: NewSurveyRewardsPageComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewSurveyRoutingModule { }
