import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessfulRedemptionComponent } from './successful-redemption.component';

const routes: Routes = [{
  path: '',
  component: SuccessfulRedemptionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SusscessfullRedemptionRoutingModule { }
