import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PerxBlackcombPagesModule,
  ProfileBarcodeComponent
} from '@perxtech/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { UtilsModule } from '@perxtech/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { NgxBarcodeModule } from 'ngx-barcode';

const routes: Routes = [{
  path: '',
  component: ProfileBarcodeComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UtilsModule,
    MatButtonModule,
    TranslateModule,
    PerxBlackcombPagesModule,
    NgxBarcodeModule
  ]
})
export class BarcodeModule { }
