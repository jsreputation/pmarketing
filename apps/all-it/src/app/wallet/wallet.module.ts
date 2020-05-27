import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletHistoryComponent, WalletHistoryModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: WalletHistoryComponent
}];

@NgModule({
  imports: [
    WalletHistoryModule,
    RouterModule.forChild(routes)
  ]
})
export class WalletModule { }
