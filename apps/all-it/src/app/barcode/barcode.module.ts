import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileBarcodeComponent } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { UtilsModule } from '@perx/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { NgxBarcodeModule } from 'ngx-barcode';

const routes: Routes = [{
  path: '',
  component: ProfileBarcodeComponent
}];

@NgModule({
  declarations: [
    ProfileBarcodeComponent
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
