import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantForgotPasswordComponent, MerchantForgotPasswordModule } from '@perxtech/bcm-pages';

const routes: Routes = [{
  path: '',
  component: MerchantForgotPasswordComponent
}];

@NgModule({
  imports: [
    MerchantForgotPasswordModule,
    RouterModule.forChild(routes),
  ]
})
export class ForgotPasswordModule { }
