import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { UtilsModule } from '../utils/utils.module';
import { RebatesListComponent } from './rebates-list/rebates-list.component';
import { QrScannerComponent } from './rebates-qr-scanner/qrscanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    RebatesListComponent,
    QrScannerComponent
  ],
  imports: [CommonModule, MaterialModule, UtilsModule,  ZXingScannerModule, MatIconModule],
  exports: [
    RebatesListComponent,
    QrScannerComponent
  ]
})
export class RebatesModule { }
