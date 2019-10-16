import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { LoyaltyModule, ICampaignService, RewardsModule, RewardsService, LoyaltyService } from '@perx/core';
import { GamesCollectionComponent } from './games-collection/games-collection.component';
import { campaigns } from '../mock/campaigns.mock';
import { of } from 'rxjs';
import { rewards } from '../mock/rewards.mock';
import { loyalty } from '../mock/loyalty.mock';

const campaignServiceStub = {
  getCampaigns: () => of(campaigns)
};

const rewardsServiceStub = {
  getAllRewards: () => of(rewards),
  getReward: () => of(rewards)
};

const loyaltyServiceStub = {
  getLoyalties: () => of([loyalty])
};

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
    RewardsModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    { provide: ICampaignService, useValue: campaignServiceStub },
    { provide: RewardsService, useValue: rewardsServiceStub },
    { provide: LoyaltyService, useValue: loyaltyServiceStub }
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
