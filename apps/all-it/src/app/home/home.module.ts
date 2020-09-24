import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDialogModule } from '@angular/material';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  CampaignModule,
  CampaignServiceModule,
  LoyaltyModule,
  OutcomeModule,
  RewardPopupComponent,
  RewardsModule,
  UtilsModule,
  QuizModule,
  SurveyModule
} from '@perxtech/core';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeComponent } from './home.component';
import { PageComponentsModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
}];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    LoyaltyModule,
    UtilsModule,
    RewardsModule,
    TranslateModule.forChild(),
    InfiniteScrollModule,
    CampaignModule,
    CampaignServiceModule.forChild(),
    QuizModule,
    OutcomeModule,
    RouterModule.forChild(routes),
    PageComponentsModule,
    SurveyModule,
  ],
  exports: [
    HomeComponent
  ],
  entryComponents: [
    RewardPopupComponent
  ]
})
export class HomeModule { }
