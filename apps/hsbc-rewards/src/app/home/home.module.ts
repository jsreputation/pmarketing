import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoyaltyModule, ProfileModule, RewardsModule, VouchersModule, ConfigModule } from '@perx/core';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    ConfigModule.forRoot({...environment}),
    CommonModule,
    HomeRoutingModule,
    LoyaltyModule,
    ProfileModule,
    RewardsModule,
    VouchersModule,
    SharedModule,
  ]
})
export class HomeModule { }
