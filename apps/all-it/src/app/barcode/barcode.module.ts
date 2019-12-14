import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarcodeComponent } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { UtilsModule } from '@perx/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { NgxBarcodeModule } from 'ngx-barcode';

const routes: Routes = [{
  path: '',
  component: BarcodeComponent
}];

@NgModule({
  declarations: [
    BarcodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UtilsModule,
    MatButtonModule,
    TranslateModule,
    NgxBarcodeModule
  ]
})
export class BarcodeModule {}
