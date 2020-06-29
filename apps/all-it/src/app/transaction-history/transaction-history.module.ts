import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PerxBlackcombPagesModule
} from '@perxtech/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  LoyaltyModule,
  TransactionsServiceModule
} from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TransactionHistoryComponent } from './transaction-history.component';

const routes: Routes = [{
  path: '',
  component: TransactionHistoryComponent
}];

@NgModule({
  declarations : [
    TransactionHistoryComponent
  ],
  imports: [
    MatButtonModule,
    PerxBlackcombPagesModule,
    CommonModule,
    LoyaltyModule.forChild(),
    TransactionsServiceModule.forChild(),
    RouterModule.forChild(routes),
    InfiniteScrollModule
  ]
})
export class TransactionHistoryModule { }
