import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrRedemptionComponent } from './qr-redemption.component'

const routes: Routes = [{
  path: '',
  component: QrRedemptionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrRedemptionRoutingModule { }
