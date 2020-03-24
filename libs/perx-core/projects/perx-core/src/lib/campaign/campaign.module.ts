import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';
import { ExpireTimerComponent } from './reward-popup/expire-timer/expire-timer.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    RewardPopupComponent,
    ExpireTimerComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  exports: [
    RewardPopupComponent,
    ExpireTimerComponent
  ]
})
export class CampaignModule {
}

