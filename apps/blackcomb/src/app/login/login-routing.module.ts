import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignIn2Component } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: SignIn2Component,
  data: { countryList: ['Hong Kong', 'Singapore']}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
