import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RedeemComponent} from './redeem.component'

const routes: Routes = [{
  path: '',
  component: RedeemComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedeemRoutingModule { }
