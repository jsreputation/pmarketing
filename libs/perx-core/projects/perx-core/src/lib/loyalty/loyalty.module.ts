import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EnvConfig } from '../shared/env-config';
import { V4LoyaltyService } from './v4-loyalty.service';
import { LoyaltyService } from './loyalty.service';
import { LoyaltySummaryComponent } from './loyalty-summary/loyalty-summary.component';
import { LoyaltyTransactionsListComponent } from './loyalty-transactions-list/loyalty-transactions-list.component';
import { TransactionPipe } from './loyalty-transactions-list/transaction.pipe';

@NgModule({
  declarations: [
    TransactionPipe,
    LoyaltySummaryComponent,
    LoyaltyTransactionsListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoyaltySummaryComponent,
    LoyaltyTransactionsListComponent
  ],
  providers: [
    DatePipe
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
