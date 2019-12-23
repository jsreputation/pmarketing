import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignIn2Component } from '@perx/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: SignIn2Component
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
