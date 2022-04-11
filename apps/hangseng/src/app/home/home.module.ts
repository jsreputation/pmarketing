import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import {
  CampaignModule,
  CampaignServiceModule,
  LoyaltyModule,
  OutcomeModule,
  RewardPopupComponent,
  RewardsModule,
  UtilsModule,
  QuizModule,
  SurveyModule,
  TeamsServiceModule,
  InstantOutcomeTransactionServiceModule,
  PipeUtilsModule
} from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes),
    CampaignModule,
    CampaignServiceModule,
    LoyaltyModule,
    OutcomeModule,
    RewardsModule,
    UtilsModule,
    QuizModule,
    SurveyModule,
    TeamsServiceModule,
    InstantOutcomeTransactionServiceModule,
    PipeUtilsModule,
    InfiniteScrollModule,
    TranslateModule.forChild(),
  ],
  entryComponents: [
    RewardPopupComponent
  ]
})
export class HomeModule { }
