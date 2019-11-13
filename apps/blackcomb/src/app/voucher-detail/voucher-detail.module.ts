import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoucherDetailComponent } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { VouchersModule } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: VoucherDetailComponent
}];

@NgModule({
  declarations: [
    VoucherDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    VouchersModule,
    TranslateModule,
    MatButtonModule
  ]
})
export class VoucherDetailModule {}
