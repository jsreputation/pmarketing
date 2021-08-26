import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TransactionHistoryComponent } from './transaction-history.component';
import { MatButtonModule } from '@angular/material/button';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoyaltyModule } from '../../loyalty/loyalty.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MerchantAdminModule } from '../../merchant-admin/merchant-admin.module';

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
