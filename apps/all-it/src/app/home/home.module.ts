import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule, MatButtonModule, MatDialogModule } from '@angular/material';
import {
  LoyaltyModule,
  RewardsModule,
  UtilsModule,
  RewardPopupComponent,
  CampaignModule
} from '@perxtech/core';
import {
  HomeComponent,
  CampaignsCollectionComponent,
  GamesCollectionComponent,
  CatalogsComponent
} from '@perxtech/blackcomb-pages';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
const routes: Routes = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  declarations: [
    HomeComponent,
    CampaignsCollectionComponent,
    GamesCollectionComponent,
    CatalogsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    LoyaltyModule,
    UtilsModule,
    RewardsModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes),
    InfiniteScrollModule,
    MatDialogModule,
    CampaignModule
  ],
  exports: [
    HomeComponent,
    CatalogsComponent,
    CampaignsCollectionComponent,
    GamesCollectionComponent
  ],
  entryComponents: [
    RewardPopupComponent
  ]
})
export class HomeModule { }
