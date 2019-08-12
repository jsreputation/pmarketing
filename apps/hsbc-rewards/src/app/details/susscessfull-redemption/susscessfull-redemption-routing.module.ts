import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SusscessfullRedemptionComponent } from './susscessfull-redemption.component';

const routes: Routes = [{
  path: '',
  component: SusscessfullRedemptionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SusscessfullRedemptionRoutingModule { }
