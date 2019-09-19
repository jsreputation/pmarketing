import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewSurveyComponent } from './containers/new-survey/new-survey.component';
import { NewSurveyAppearancePageComponent } from './containers/new-survey-appearance-page/new-survey-appearance-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'questions' },
  {
    path: '',
    component: NewSurveyComponent,
    children: [
      {
        path: 'appearance',
        component: NewSurveyAppearancePageComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewSurveyRoutingModule { }
