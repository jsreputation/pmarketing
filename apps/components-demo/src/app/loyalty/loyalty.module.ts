import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoyaltyRoutingModule } from './loyalty-routing.module';
import { LoyaltyComponent } from './loyalty.component';
import { LoyaltySummaryComponent } from './loyalty-summary/loyalty-summary.component';
import { LoyaltyTransactionsListComponent } from './loyalty-transactions-list/loyalty-transactions-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import {
  AuthenticationModule,
  ProfileModule,
  LoyaltyModule as PerxLoyaltyModule,
  ConfigModule
} from '@perxtech/core';

@NgModule({
  declarations: [LoyaltyComponent, LoyaltySummaryComponent, LoyaltyTransactionsListComponent],
  imports: [
    ConfigModule.forChild(),
    CommonModule,
    LoyaltyRoutingModule,
    MatTabsModule,
    MatButtonModule,
    AuthenticationModule,
    ProfileModule,
    PerxLoyaltyModule
  ]
})
export class LoyaltyModule { }
