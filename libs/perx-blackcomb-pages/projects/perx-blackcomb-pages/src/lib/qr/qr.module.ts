import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule } from '@perxtech/core';
import { QRCodeModule } from 'angularx-qrcode';
import { QRComponent } from './qr.component';

@NgModule({
  declarations: [QRComponent],
  exports: [QRComponent],
  imports: [
    CommonModule,
    UtilsModule,
    QRCodeModule,
    MatButtonModule,
    TranslateModule.forChild()
  ]
})
export class QRModule { }
