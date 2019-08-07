import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsComponent } from './rewards.component';
import { RewardsCollectionComponent } from './rewards-collection/rewards-collection.component';
import { RewardsListComponent } from './rewards-list/rewards-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RewardsRoutingModule } from './rewards-routing.module';
import {
  AuthenticationModule,
  RewardsModule as PerxRewardsModule
} from '@perx/core';
import { environment } from '../../environments/environment';
import { RouterModule } from '@angular/router';
import { RewardComponent } from './reward/reward.component';
import { MatButtonModule, MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [
    RewardsComponent,
    RewardsCollectionComponent,
    RewardsListComponent,
    RewardComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    PerxRewardsModule.forRoot({ env: environment }),
    AuthenticationModule,
    RewardsRoutingModule,
    MatButtonModule,
    MatTabsModule
  ]
})
export class RewardsModule {
}
