import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SurveyModule as PerxSurveyModule,
  CampaignModule as PerxCampaignModule,
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
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    RouterModule.forChild(routes),
    PerxCampaignModule,
    PerxSurveyModule,
    AuthenticationModule
  ],
  providers: [
  ]
})
export class SurveyModule { }
