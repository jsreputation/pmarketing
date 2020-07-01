import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent, WalletModule as BCPWalletModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: WalletComponent
}];

@NgModule({
  imports: [
    BCPWalletModule,
    RouterModule.forChild(routes)
  ]
})
export class WalletModule { }
