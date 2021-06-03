import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule } from '@perxtech/core';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { ProfileBarcodeComponent } from './profile-barcode.component';

@NgModule({
  declarations: [
    ProfileBarcodeComponent
  ],
  exports: [ProfileBarcodeComponent],
  imports: [
    CommonModule,
    UtilsModule,
    MatButtonModule,
    TranslateModule,
    NgxBarcode6Module
  ]
})
export class ProfileBarcodeModule { }
