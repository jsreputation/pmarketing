import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantRegisterComponent, MerchantRegisterModule } from '@perxtech/bcm-pages';

const routes: Routes = [{
  path: '',
  component: MerchantRegisterComponent
}];

@NgModule({
  imports: [
    MerchantRegisterModule,
    RouterModule.forChild(routes),
  ]
})
export class RegisterModule { }
