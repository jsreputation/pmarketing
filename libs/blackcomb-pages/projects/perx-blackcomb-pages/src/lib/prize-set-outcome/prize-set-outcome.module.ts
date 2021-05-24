import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PrizeSetOutcomeModule as BCPPrizeSetOutcomeModule } from '@perxtech/core';
import { PrizeSetOutcomeComponent } from './prize-set-outcome.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [PrizeSetOutcomeComponent],
  exports: [PrizeSetOutcomeComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    BCPPrizeSetOutcomeModule
  ],
  providers: []
})
export class PrizeSetOutcomeModule { }
