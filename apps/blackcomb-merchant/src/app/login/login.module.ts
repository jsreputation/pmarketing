import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantLoginModule, MerchantLoginComponent } from '@perxtech/core';

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
