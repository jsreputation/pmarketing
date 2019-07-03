import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewSurveyComponent} from '../new-survey/containers/new-survey/new-survey.component';
import {NewSurveyQuestionsPageComponent} from '../new-survey/containers/new-survey-questions-page/new-survey-questions-page.component';
import {NewSurveyAppearancePageComponent} from '../new-survey/containers/new-survey-appearance-page/new-survey-appearance-page.component';
import {NewSurveyRewardsPageComponent} from '../new-survey/containers/new-survey-rewards-page/new-survey-rewards-page.component';
import {NewStampComponent} from './containers/new-stamp/new-stamp.component';
import {NewStampSettingsPageComponent} from './containers/new-stamp-settings-page/new-stamp-settings-page.component';
import {NewStampRulesPageComponent} from './containers/new-stamp-rules-page/new-stamp-rules-page.component';
import {NewStampDisplayPageComponent} from './containers/new-stamp-display-page/new-stamp-display-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'settings'},
  {
    path: '',
    component: NewStampComponent,
    children: [
      {
        path: 'settings',
        component: NewStampSettingsPageComponent
      },
      {
        path: 'rules',
        component: NewStampRulesPageComponent
      },
      {
        path: 'display',
        component: NewStampDisplayPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewStampRoutingModule { }
