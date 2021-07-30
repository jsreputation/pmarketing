import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpireTimerComponent } from './reward-popup/expire-timer/expire-timer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';

@NgModule({
  declarations: [
    ExpireTimerComponent,
    RewardPopupComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  exports: [
    RewardPopupComponent,
    ExpireTimerComponent
  ]
})
export class CampaignModule {}

