import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QrscannerComponent } from './qrscanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [QrscannerComponent],
  exports: [QrscannerComponent],
  imports: [
    CommonModule,
    ZXingScannerModule,
    TranslateModule.forChild(),
    MatButtonModule
  ]
})
export class QrscannerModule { }
