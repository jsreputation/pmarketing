import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignIn2Module, SignIn2Component } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: SignIn2Component,
  data: {
    countryList: ['Hong Kong', 'Singapore'],
    countryCodePrefix: '852'
  }
}];

@NgModule({
  imports: [
    SignIn2Module,
    RouterModule.forChild(routes),
  ]
})
export class LoginModule { }
