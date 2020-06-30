import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  RebatesWalletComponent,
  RebatesModule as BCPRebatesModule,
  TransactionComponent,
  TransactionCompleteComponent,
  TransactionShowComponent,
  OverviewComponent
} from '@perxtech/blackcomb-pages';

const routes: Routes = [
  { path: '', component: RebatesWalletComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'transaction/:id', component: TransactionComponent },
  { path: 'show', component: TransactionShowComponent },
  { path: 'complete', component: TransactionCompleteComponent },
];

@NgModule({
  imports: [
    BCPRebatesModule,
    RouterModule.forChild(routes)
  ]
})
export class RebatesModule { }
