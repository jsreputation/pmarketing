import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { EnvConfig } from '../shared/env-config';
import { V4LoyaltyService } from './v4-loyalty.service';
import { LoyaltyService } from './loyalty.service';
import { LoyaltySummaryComponent } from './loyalty-summary/loyalty-summary.component';
import { LoyaltyTransactionHistoryComponent } from './loyalty-transaction-history/loyalty-transaction-history.component';
import { TransactionPipe } from './loyalty-transaction-history/transaction.pipe';

@NgModule({
  declarations: [
    TransactionPipe,
    LoyaltySummaryComponent,
    LoyaltyTransactionHistoryComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule
  ],
  exports: [
    LoyaltySummaryComponent,
    LoyaltyTransactionHistoryComponent
  ]
})
export class LoyaltyModule {
  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: LoyaltyModule,
      providers: [
        {
          provide: EnvConfig,
          useValue: config
        },
        {
          provide: LoyaltyService,
          useClass: V4LoyaltyService
        }
      ],
    };
  }
}
