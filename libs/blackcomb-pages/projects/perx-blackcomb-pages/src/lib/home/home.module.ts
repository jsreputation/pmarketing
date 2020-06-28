import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CampaignsCollectionComponent } from './campaigns-collection/campaigns-collection.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { GamesCollectionComponent } from './games-collection/games-collection.component';
import { HomeComponent } from './home.component';

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
  ],
  exports: [
    HomeComponent,
    CampaignsCollectionComponent,
    GamesCollectionComponent,
    CatalogsComponent
  ],
  entryComponents: [
    RewardPopupComponent,
  ]
})
export class HomeModule { }
