import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoyaltyComponent } from './loyalty.component';
import { LoyaltySummaryComponent } from './loyalty-summary/loyalty-summary.component';
import { LoyaltyTransactionsListComponent } from './loyalty-transactions-list/loyalty-transactions-list.component';

const routes: Routes = [
  {
    path: '', component: LoyaltyComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: LoyaltySummaryComponent },
      { path: 'transactions-list', component: LoyaltyTransactionsListComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltyRoutingModule { }
