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
} from '@perx/core';
import {
  HomeComponent,
  GamesCollectionComponent
} from '@perx/blackcomb-pages';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
const routes: Routes = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  declarations: [
    HomeComponent,
    GamesCollectionComponent
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
    GamesCollectionComponent
  ],
  entryComponents: [
    RewardPopupComponent
  ]
})
export class HomeModule { }
