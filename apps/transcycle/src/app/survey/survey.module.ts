import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthenticationModule,
  CampaignModule as PerxCampaignModule,
  CampaignServiceModule as PerxSvcCampaignModule,
  ConfigModule,
  SurveyModule as PerxSurveyModule,
} from '@perxtech/core';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatProgressBarModule,
  MatRadioModule,
  MatToolbarModule
} from '@angular/material';
import {
  PerxBlackcombPagesModule,
  SurveyComponent
} from '@perxtech/blackcomb-pages';
import {
  RouterModule,
  Routes
} from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SurveyComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [
    ConfigModule.forChild(),
    PerxBlackcombPagesModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    RouterModule.forChild(routes),
    PerxCampaignModule,
    PerxSvcCampaignModule.forChild(),
    PerxSurveyModule,
    AuthenticationModule
  ],
  providers: [
  ]
})
export class SurveyModule { }
