import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule, MatButtonModule, MatDialogModule } from '@angular/material';
import {
  LoyaltyModule,
  RewardsModule,
  UtilsModule,
  RewardPopupComponent,
  CampaignModule,
  OutcomeModule
} from '@perx/core';
import {
  HomeComponent,
  GamesCollectionComponent,
  CampaignsCollectionComponent,
  CatalogsComponent,
  PerxBlackcombPagesModule
} from '@perx/blackcomb-pages';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
const routes: Routes = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    LoyaltyModule,
    UtilsModule,
    RewardsModule,
    MatCardModule,
    MatButtonModule,
    PerxBlackcombPagesModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes),
    InfiniteScrollModule,
    MatDialogModule,
    CampaignModule,
    OutcomeModule
  ],
  exports: [
    HomeComponent,
    GamesCollectionComponent,
    CampaignsCollectionComponent,
    CatalogsComponent
  ],
  entryComponents: [
    RewardPopupComponent
  ]
})
export class HomeModule { }
