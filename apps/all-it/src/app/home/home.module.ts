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
  QuizModule
} from '@perxtech/core';
import {
  HomeModule as BCPHomeModule
} from '@perxtech/blackcomb-pages';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeComponent } from './home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
}];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    BCPHomeModule,
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
  ],
  exports: [
    HomeComponent
  ],
  entryComponents: [
    RewardPopupComponent
  ]
})
export class HomeModule { }
