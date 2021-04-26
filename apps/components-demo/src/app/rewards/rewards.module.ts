import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsComponent } from './rewards.component';
import { RewardsCollectionComponent } from './rewards-collection/rewards-collection.component';
import { RewardsListComponent } from './rewards-list/rewards-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RewardsRoutingModule } from './rewards-routing.module';
import {
  AuthenticationModule,
  RewardsModule as PerxRewardsModule,
  UtilsModule as PerxCoreUtilsModule
} from '@perxtech/core';
import { RouterModule } from '@angular/router';
import { RewardComponent } from './reward/reward.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RewardsListTabbedComponent } from './rewards-list-tabbed/rewards-list-tabbed.component';

@NgModule({
  declarations: [
    RewardsComponent,
    RewardsCollectionComponent,
    RewardsListComponent,
    RewardComponent,
    RewardsListTabbedComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    PerxRewardsModule,
    AuthenticationModule,
    RewardsRoutingModule,
    MatButtonModule,
    MatTabsModule,
    PerxCoreUtilsModule,
  ]
})
export class RewardsModule {
}
