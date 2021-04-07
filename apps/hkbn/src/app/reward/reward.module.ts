import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardComponent } from './containers/reward/reward.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RewardRoutingModule } from './reward-routing.module';
import { RewardConfirmComponent } from './components/reward-confirm/reward-confirm.component';
import { RewardsModule, VouchersModule, UtilsModule } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [RewardComponent, RewardConfirmComponent],
  imports: [
    CommonModule,
    RewardRoutingModule,
    RewardsModule,
    VouchersModule,
    MatButtonModule,
    MatDialogModule,
    UtilsModule,
    TranslateModule,
  ],
  entryComponents: [
    RewardConfirmComponent
  ]
})
export class RewardModule {
}
