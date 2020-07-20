import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent, ForgotPasswordModule as BCPForgotPasswordModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: ForgotPasswordComponent,
  data: {
    countryList: ['Malaysia', 'Singapore'],
    validateMembership: true
  }
}];

@NgModule({
  imports: [
    BCPForgotPasswordModule,
    RouterModule.forChild(routes)
  ]
})
export class ForgotPasswordModule { }
