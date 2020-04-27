import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '@perxtech/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { QRCodeModule } from 'angularx-qrcode';

import { QRComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{
  path: '',
  component: QRComponent
}];

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    QRCodeModule,
    MatButtonModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes),
    TranslateModule
  ]
})
export class QRModule { }
