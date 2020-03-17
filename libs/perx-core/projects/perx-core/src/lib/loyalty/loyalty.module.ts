import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';

import { V4LoyaltyService } from './v4-loyalty.service';
import { LoyaltyService } from './loyalty.service';
import { LoyaltySummaryComponent } from './loyalty-summary/loyalty-summary.component';
import { LoyaltyTransactionsListComponent } from './loyalty-transactions-list/loyalty-transactions-list.component';
import { TransactionPipe } from './loyalty-transactions-list/transaction.pipe';
import { Config } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { WhistlerLoyaltyService } from './whistler-loyalty.service';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import {MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';

export function loyaltyServiceFactory(http: HttpClient, config: Config): LoyaltyService {
  // Make decision on what to instantiate base on config
  if (config.isWhistler) {
    return new WhistlerLoyaltyService(http, config);
  }
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
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  exports: [
    LoyaltySummaryComponent,
    LoyaltyTransactionsListComponent
  ],
  providers: [
    DatePipe,
    TransactionPipe,
    CurrencyPipe,
    {
      provide: LoyaltyService,
      useFactory: loyaltyServiceFactory,
      deps: [HttpClient, Config, AuthenticationService]
    }
  ]
})
export class LoyaltyModule {
}
