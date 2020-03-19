import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { UtilsModule, VouchersModule } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: RedeemComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerxBlackcombPagesModule,
    VouchersModule,
    TranslateModule,
    MatButtonModule,
    UtilsModule
  ]
})
export class RedeemModule {}
