import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantRegisterModule, MerchantRegisterComponent } from '@perxtech/core';

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
