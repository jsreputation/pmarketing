import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoucherDetailComponent } from './voucher-detail.component';

const routes: Routes = [{
  path: ':id',
  component: VoucherDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoucherDetailRoutingModule { }
