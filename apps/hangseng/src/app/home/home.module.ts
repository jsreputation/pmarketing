import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageComponentsModule, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { CampaignsCollectionComponent } from './campaigns-collection/campaigns-collection.component';
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
import { HomeComponent } from './home.component';
import { HomeMissionComponent } from './home-mission/home-mission.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  declarations: [HomeComponent, HomeMissionComponent, CampaignsCollectionComponent],
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
    PageComponentsModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
    MatDialogModule,
    MatChipsModule
  ],
  entryComponents: [
    RewardPopupComponent,
  ]
})
export class HomeModule { }
