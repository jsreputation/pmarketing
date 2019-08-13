import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardComponent } from './containers/reward/reward.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { RewardRoutingModule } from './reward-routing.module';
import { RewardConfirmComponent } from './components/reward-confirm/reward-confirm.component';
import { RewardsModule } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [RewardComponent, RewardConfirmComponent],
  imports: [
    CommonModule,
    RewardRoutingModule,
    RewardsModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule,
  ],
  entryComponents: [
    RewardConfirmComponent
  ]
})
export class RewardModule {
}
