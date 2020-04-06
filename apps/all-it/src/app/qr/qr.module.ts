import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '@perxtech/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { QRCodeModule } from 'angularx-qrcode';

import {
  PerxBlackcombPagesModule,
  QRComponent
} from '@perxtech/blackcomb-pages';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{
  path: '',
  component: QRComponent
}];

@NgModule({
  imports: [
    CommonModule,
    PerxBlackcombPagesModule,
    UtilsModule,
    QRCodeModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    TranslateModule
  ]
})
export class QRModule { }
