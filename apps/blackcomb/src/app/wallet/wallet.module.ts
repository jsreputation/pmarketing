import { NgModule } from '@angular/core';
import { WalletComponent } from '@perx/blackcomb-pages';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VouchersModule, PuzzlesModule } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

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
    TranslateModule,
    InfiniteScrollModule,
    PuzzlesModule
  ]
})
export class WalletModule { }
