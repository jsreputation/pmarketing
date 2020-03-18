import { NgModule } from '@angular/core';
import { WalletHistoryComponent } from '@perxtech/blackcomb-pages';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VouchersModule } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
  declarations: [
    WalletHistoryComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
    VouchersModule,
    TranslateModule,
    InfiniteScrollModule
  ]
})
export class WalletModule { }
