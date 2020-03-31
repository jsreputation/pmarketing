import { NgModule } from '@angular/core';
import { WalletComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VouchersModule, PuzzlesModule } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes: Routes = [{
  path: '',
  component: WalletComponent
}];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes),
    VouchersModule,
    TranslateModule,
    InfiniteScrollModule,
    PuzzlesModule
  ]
})
export class WalletModule { }
