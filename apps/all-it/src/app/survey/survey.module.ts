import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import {
  AuthenticationModule,
  CampaignModule as PerxCampaignModule,
  CampaignServiceModule as PerxSvcCampaignModule,
  ConfigModule, SurveyModule as PerxSurveyModule,
  SurveyComponent
} from '@perxtech/core';
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
