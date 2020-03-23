import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoucherDetailComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { VouchersModule } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: VoucherDetailComponent
}];

@NgModule({
  imports: [
    CommonModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes),
    VouchersModule,
    TranslateModule,
    MatButtonModule
  ]
})
export class VoucherDetailModule {}
