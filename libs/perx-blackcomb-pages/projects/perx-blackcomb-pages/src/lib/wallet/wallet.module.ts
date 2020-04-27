import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PuzzlesModule, VouchersModule, UtilsModule, SettingsModule } from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { WalletComponent } from './wallet.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WalletComponent],
  exports: [WalletComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    UtilsModule,
    SettingsModule,
    VouchersModule,
    InfiniteScrollModule,
    PuzzlesModule
  ]
})
export class WalletModule { }
