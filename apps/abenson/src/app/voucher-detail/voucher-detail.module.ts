import { NgModule } from '@angular/core';
import {
  VoucherDetailModule as BCPVoucherDetailModule,
  VoucherDetailComponent,
} from '@perxtech/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: VoucherDetailComponent,
  },
];

@NgModule({
  imports: [BCPVoucherDetailModule, RouterModule.forChild(routes)],
})
export class VoucherDetailModule {}
