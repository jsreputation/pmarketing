import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TransactionHistoryComponent } from './transaction-history.component';
import { MatButtonModule } from '@angular/material/button';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoyaltyModule, MerchantAdminModule } from '@perxtech/core';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    TransactionHistoryComponent,
  ],
  exports: [TransactionHistoryComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    InfiniteScrollModule,
    LoyaltyModule,
    MatTabsModule,
    MerchantAdminModule,
    TranslateModule.forChild(),
  ]
})
export class TransactionHistoryModule { }
