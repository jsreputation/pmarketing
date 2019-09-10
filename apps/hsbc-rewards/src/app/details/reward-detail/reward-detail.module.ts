import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardDetailRoutingModule } from './reward-detail-routing.module';
import { RewardDetailComponent } from './reward-detail.component';
import { RewardsModule, VouchersModule, ConfigModule } from '@perx/core';
import { DetailHeaderModule } from '../detail-header/detail-header.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [RewardDetailComponent],
  imports: [
    ConfigModule.forRoot({...environment}),
    CommonModule,
    RewardDetailRoutingModule,
    RewardsModule,
    VouchersModule,
    DetailHeaderModule,
    SharedModule
  ]
})
export class RewardDetailModule { }
