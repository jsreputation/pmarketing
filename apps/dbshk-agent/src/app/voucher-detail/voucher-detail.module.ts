import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoucherDetailComponent, VoucherDetailModule as BCPVoucherDetailModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: VoucherDetailComponent
}];

@NgModule({
  imports: [
    BCPVoucherDetailModule,
    RouterModule.forChild(routes)
  ]
})
export class VoucherDetailModule { }
