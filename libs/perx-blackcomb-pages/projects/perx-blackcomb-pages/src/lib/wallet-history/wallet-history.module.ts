import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { VouchersModule } from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { WalletHistoryComponent } from './wallet-history.component';

@NgModule({
  declarations: [WalletHistoryComponent],
  exports: [WalletHistoryComponent],
  imports: [
    CommonModule,
    VouchersModule,
    RouterModule,
    TranslateModule,
    InfiniteScrollModule,
    MatTabsModule
  ]
})
export class WalletHistoryModule { }
