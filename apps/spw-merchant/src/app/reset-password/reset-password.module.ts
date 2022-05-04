import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantResetPasswordComponent, MerchantResetPasswordModule } from '@perxtech/bcm-pages';

const routes: Routes = [{
  path: '',
  component: MerchantResetPasswordComponent
}];

@NgModule({
  imports: [
    MerchantResetPasswordModule,
    RouterModule.forChild(routes),
  ]
})
export class ResetPasswordModule { }
