import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardDetailRoutingModule } from './reward-detail-routing.module';
import { RewardDetailComponent } from './reward-detail.component';
import { RewardsModule, VouchersModule } from '@perx/core';
import { DetailHeaderModule } from '../detail-header/detail-header.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [RewardDetailComponent],
  imports: [
    CommonModule,
    RewardDetailRoutingModule,
    RewardsModule.forRoot({env: environment}),
    VouchersModule.forRoot({env: environment}),
    DetailHeaderModule,
    SharedModule
  ]
})
export class RewardDetailModule { }
