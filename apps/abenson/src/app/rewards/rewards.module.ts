import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardDetailComponent } from './reward-detail/reward-detail.component';
import { RewardsModule as PerxRewardsModule } from '@perxtech/core';
import { SharedModule } from '../shared/shared.module';
import { RewardConfirmComponent } from './reward-confirm/reward-confirm.component';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [{
  path: '',
  component: RewardDetailComponent
}];

@NgModule({
  declarations: [RewardDetailComponent, RewardConfirmComponent],
  imports: [
    CommonModule,
    PerxRewardsModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatIconModule
  ],
  entryComponents: [
    RewardConfirmComponent
  ]
})
export class RewardsModule { }
