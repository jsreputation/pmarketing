import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
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
  QuizServiceModule,
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
    QuizServiceModule.forChild(),
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
