import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletComponent } from './wallet.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';

const routes: Routes = [
  { path: '', component: WalletComponent },
  { path: 'details/:id', component: VoucherDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
