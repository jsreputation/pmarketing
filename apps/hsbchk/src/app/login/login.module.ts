import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignIn2Component, SignIn2Module } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: SignIn2Component,
  data: { countryList: ['Hong Kong', 'Singapore']}
}];

@NgModule({
  imports: [
    SignIn2Module,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
