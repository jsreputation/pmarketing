import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemComponent } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { VouchersModule } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: RedeemComponent
}];

@NgModule({
  declarations: [
    RedeemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    VouchersModule,
    TranslateModule,
    MatButtonModule
  ]
})
export class RedeemModule {}
