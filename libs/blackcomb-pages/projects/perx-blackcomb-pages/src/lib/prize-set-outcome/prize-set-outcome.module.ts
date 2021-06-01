import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PrizeSetOutcomeModule as BCPPrizeSetOutcomeModule, UtilsModule } from '@perxtech/core';
import { PrizeSetOutcomeComponent } from './prize-set-outcome.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';
@NgModule({
  declarations: [PrizeSetOutcomeComponent],
  exports: [PrizeSetOutcomeComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatToolbarModule,
    MatProgressBarModule,
    BCPPrizeSetOutcomeModule,
    UtilsModule,
    MatListModule,
    TranslateModule.forChild()
  ],
  providers: []
})
export class PrizeSetOutcomeModule { }
