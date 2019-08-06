import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardDetailRoutingModule } from './reward-detail-routing.module';
import { RewardDetailComponent } from './reward-detail.component';
import { RewardsModule } from '@perx/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [RewardDetailComponent],
  imports: [
    CommonModule,
    RewardDetailRoutingModule,
    RewardsModule.forRoot({env:environment})
  ]
})
export class RewardDetailModule { }
