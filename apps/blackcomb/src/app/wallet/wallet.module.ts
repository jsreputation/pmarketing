import { NgModule } from '@angular/core';
import { WalletComponent } from '@perx/blackcomb-pages';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VouchersModule } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{
  path: '',
  component: WalletComponent
}];

@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    VouchersModule,
    TranslateModule
  ]
})
export class WalletModule { }
