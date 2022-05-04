import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BadgeServiceModule, InstantOutcomeTransactionServiceModule, UtilsModule } from '@perxtech/core';
import { InstantRewardOutcomeComponent } from './instant-reward-outcome.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';
@NgModule({
  declarations: [InstantRewardOutcomeComponent],
  exports: [InstantRewardOutcomeComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatToolbarModule,
    MatProgressBarModule,
    InstantOutcomeTransactionServiceModule.forChild(),
    BadgeServiceModule.forChild(),
    UtilsModule,
    MatListModule,
    TranslateModule.forChild()
  ],
  providers: []
})
export class InstantRewardOutcomeModule { }
