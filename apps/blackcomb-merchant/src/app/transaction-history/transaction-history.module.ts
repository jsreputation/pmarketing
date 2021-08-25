import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantTransactionHistoryComponent, MerchantTransactionHistoryModule} from '@perxtech/core';

const routes: Routes = [{
  path: '',
  component: MerchantTransactionHistoryComponent
}];

@NgModule({
  imports: [
    MerchantTransactionHistoryModule,
    RouterModule.forChild(routes)
  ]
})
export class TransactionHistoryModule { }
