import { NgModule } from '@angular/core';
import { VouchersModule } from './vouchers/vouchers.module';

import { PuzzlesModule } from './puzzles/puzzles.module';
import { AuthenticationModule } from './auth/authentication/authentication.module';
import { RewardsCarouselComponent } from './rewards/rewards-carousel/rewards-carousel.component';
import { RewardsListComponent } from './rewards/rewards-list/rewards-list.component';
import { RewardsListTabbedComponent } from './rewards/rewards-list-tabbed/rewards-list-tabbed.component';
import { LoyaltySummaryComponent } from './loyalty/loyalty-summary/loyalty-summary.component';
import { LoyaltyTransactionHistoryComponent } from './loyalty/loyalty-transaction-history/loyalty-transaction-history.component';

const modules = [VouchersModule, PuzzlesModule, AuthenticationModule];

@NgModule({
  declarations: [
  RewardsCarouselComponent,
  RewardsListComponent,
  RewardsListTabbedComponent,
  LoyaltySummaryComponent,
  LoyaltyTransactionHistoryComponent],
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class PerxCoreModule {}
