import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { V4LoyaltyService } from './v4-loyalty.service';
import { LoyaltyService } from './loyalty.service';
import { LoyaltySummaryComponent } from './loyalty-summary/loyalty-summary.component';
import { LoyaltyTransactionsListComponent } from './loyalty-transactions-list/loyalty-transactions-list.component';
import { TransactionPipe } from './loyalty-transactions-list/transaction.pipe';
import { Config } from '../config/config';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export function loyaltyServiceFactory(http: HttpClient, config: Config): LoyaltyService {
  // Make decision on what to instantiate base on config
  return new V4LoyaltyService(http, config);
}

@NgModule({
  declarations: [
    TransactionPipe,
    LoyaltySummaryComponent,
    LoyaltyTransactionsListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    LoyaltySummaryComponent,
    LoyaltyTransactionsListComponent
  ],
  providers: [
    DatePipe,
    TransactionPipe,
    {
      provide: LoyaltyService,
      useFactory: loyaltyServiceFactory,
      deps: [HttpClient, Config]
    }
  ]
})
export class LoyaltyModule {
}
