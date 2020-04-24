import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDialogModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  CampaignsCollectionComponent,
  CatalogsComponent,
  GamesCollectionComponent,
  HomeComponent,
  PerxBlackcombPagesModule
} from '@perxtech/blackcomb-pages';
import {
  CampaignModule,
  GameServiceModule as PerxGameServiceModule,
  LoyaltyModule,
  OutcomeModule,
  RewardPopupComponent,
  RewardsModule,
  UtilsModule
} from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  imports: [
    CommonModule,
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
    OutcomeModule,
    PerxGameServiceModule.forChild()
  ],
  exports: [
    HomeComponent,
    GamesCollectionComponent,
    CampaignsCollectionComponent,
    CatalogsComponent
  ],
  entryComponents: [
    RewardPopupComponent
  ],
  providers: [
  ]
})
export class HomeModule { }
