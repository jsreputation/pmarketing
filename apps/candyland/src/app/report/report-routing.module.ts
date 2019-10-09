import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './containers/survey/survey.component';
import { StampComponent } from './containers/stamp/stamp.component';

const routes: Routes = [
  {
    path: 'survey/:id',
    component: SurveyComponent,
  },
  {
    path: 'stamps/:id',
    component: StampComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
