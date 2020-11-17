import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDialogModule, MatRippleModule } from '@angular/material';
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
  component: HomeComponent
}];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
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
    SurveyModule,
    PageComponentsModule
  ],
  exports: [
    HomeComponent,
  ],
  entryComponents: [
    RewardPopupComponent,
  ]
})
export class HomeModule { }
