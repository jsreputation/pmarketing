import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QRCodeRoutingModule } from './qr-code-routing.module';
import { QRCodeComponent } from './qr-code.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [QRCodeComponent],
  imports: [
    CommonModule,
    QRCodeRoutingModule,
    NgxBarcodeModule,
    MatButtonModule
  ]
})
export class QRCodeModule { }
