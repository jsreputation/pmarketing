import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  WalletHistoryComponent,
  WalletHistoryModule,
} from '@perxtech/blackcomb-pages';

const routes: Routes = [{ path: '', component: WalletHistoryComponent }];

@NgModule({
  imports: [WalletHistoryModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletRoutingModule {}
