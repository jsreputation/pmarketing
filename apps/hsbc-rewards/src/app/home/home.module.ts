import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoyaltyModule, ProfileModule, RewardsModule, VouchersModule, ConfigModule, MerchantsModule } from '@perxtech/core';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    ConfigModule.forChild(),
    CommonModule,
    HomeRoutingModule,
    LoyaltyModule.forChild(),
    ProfileModule,
    MerchantsModule,
    RewardsModule.forChild(),
    VouchersModule,
    SharedModule,
    InfiniteScrollModule,
  ]
})
export class HomeModule { }
