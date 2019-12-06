import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { V4LoyaltyService } from './v4-loyalty.service';
import { LoyaltyService } from './loyalty.service';
import { LoyaltySummaryComponent } from './loyalty-summary/loyalty-summary.component';
import { LoyaltyTransactionsListComponent } from './loyalty-transactions-list/loyalty-transactions-list.component';
import { TransactionPipe } from './loyalty-transactions-list/transaction.pipe';
import { Config } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { WhistlerLoyaltyService } from './whistler-loyalty.service';
import { AuthenticationService } from '../auth/authentication/authentication.service';

export function loyaltyServiceFactory(http: HttpClient, config: Config, auth: AuthenticationService): LoyaltyService {
  // Make decision on what to instantiate base on config
  if (config.isWhistler) {
    return new WhistlerLoyaltyService(http, config, auth);
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
      deps: [HttpClient, Config, AuthenticationService]
    }
  ]
})
export class LoyaltyModule {
}
