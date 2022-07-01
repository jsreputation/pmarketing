import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule, VouchersModule } from '@perxtech/core';

import { RedeemComponent } from './redeem.component';

const routes: Routes = [{
  path: '',
  component: RedeemComponent
}];

@NgModule({
  declarations: [RedeemComponent],
  imports: [
    CommonModule,
    VouchersModule,
    MatButtonModule,
    UtilsModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ]
})
export class RedeemModule { }
