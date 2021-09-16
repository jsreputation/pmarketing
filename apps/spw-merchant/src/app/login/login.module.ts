import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantLoginComponent, MerchantLoginModule } from '@perxtech/bcm-pages';

const routes: Routes = [{
  path: '',
  component: MerchantLoginComponent
}];

@NgModule({
  imports: [
    MerchantLoginModule,
    RouterModule.forChild(routes),
  ]
})
export class LoginModule { }
