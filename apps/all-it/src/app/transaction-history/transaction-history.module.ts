import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PerxBlackcombPagesModule,
  TransactionHistoryComponent
} from '@perxtech/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LoyaltyModule } from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes: Routes = [{
  path: '',
  component: TransactionHistoryComponent
}];

@NgModule({
  imports: [
    MatButtonModule,
    PerxBlackcombPagesModule,
    CommonModule,
    LoyaltyModule,
    RouterModule.forChild(routes),
    InfiniteScrollModule
  ]
})
export class TransactionHistoryModule { }
