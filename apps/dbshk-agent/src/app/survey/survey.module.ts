import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SurveyModule as PerxSurveyModule,
  CampaignModule as PerxCampaignModule,
  CampaignServiceModule as PerxSvcCampaignModule,
  ConfigModule,
  AuthenticationModule,
  SurveyComponent,
} from '@perxtech/core';

import {
  MatCardModule,
  MatButtonModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatRadioModule,
  MatToolbarModule,
  MatCheckboxModule
} from '@angular/material';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { Routes, RouterModule } from '@angular/router';

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
