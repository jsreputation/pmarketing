import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  QuizModule as PerxQuizModule,
  CampaignModule as PerxCampaignModule,
  ConfigModule,
  AuthenticationModule,
  QuizComponent
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
  { path: '', pathMatch: 'full', component: QuizComponent },
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
    PerxQuizModule,
    AuthenticationModule
  ],
  providers: [
  ]
})
export class QuizModule { }
