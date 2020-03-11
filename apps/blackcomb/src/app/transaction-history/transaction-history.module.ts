import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionHistoryComponent, PerxBlackcombPagesModule } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LoyaltyModule } from '@perx/core';
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
