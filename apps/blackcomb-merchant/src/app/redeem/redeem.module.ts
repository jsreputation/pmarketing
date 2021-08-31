import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantRedeemComponent, MerchantRedeemModule } from '@perxtech/core';

const routes: Routes = [{
  path: '',
  component: MerchantRedeemComponent
}];

@NgModule({
  imports: [
    MerchantRedeemModule,
    RouterModule.forChild(routes)
  ]
})
export class RedeemModule { }
