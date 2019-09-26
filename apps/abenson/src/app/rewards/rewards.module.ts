import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardDetailComponent } from './reward-detail/reward-detail.component';
import { RewardsModule as PerxRewardsModule, RewardsService } from '@perx/core';
import { rewards } from '../mock/rewards.mock';
import { of, from } from 'rxjs';
import { catalogs } from '../mock/catalogs.mock';
import { SharedModule } from '../shared/shared.module';
import { RewardConfirmComponent } from './reward-confirm/reward-confirm.component';

const rewardsServiceStub = {
  getReward: () => of(rewards[0]),
  getAllRewards: () => of(rewards),
  getAllCatalogs: () => of(catalogs),
  getCatalog: (id: number) => from(catalogs.filter(catalog => catalog.id === id))
};

@NgModule({
  declarations: [RewardDetailComponent, RewardConfirmComponent],
  imports: [
    CommonModule,
    RewardsRoutingModule,
    PerxRewardsModule,
    SharedModule
  ],
  providers: [
    { provide: RewardsService, useValue: rewardsServiceStub }
  ],
  entryComponents: [
    RewardConfirmComponent
  ]
})
export class RewardsModule { }
