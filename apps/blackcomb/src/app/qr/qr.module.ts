import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '@perx/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { QRCodeModule} from 'angularx-qrcode';

import { QRComponent } from '@perx/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: QRComponent
}];

@NgModule({
  declarations: [QRComponent],
  imports: [
    CommonModule,
    UtilsModule,
    QRCodeModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class QRModule { }
