import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantTransactionHistoryComponent, MerchantTransactionHistoryModule } from '@perxtech/bcm-pages';

const routes: Routes = [{
  path: '',
  component: MerchantTransactionHistoryComponent,
  data: { hideDescription: true }
}];

@NgModule({
  imports: [
    MerchantTransactionHistoryModule,
    RouterModule.forChild(routes)
  ]
})
export class TransactionHistoryModule { }
