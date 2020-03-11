import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent, PerxBlackcombPagesModule } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { VouchersModule } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

const routes: Routes = [{
  path: '',
  component: HistoryComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    VouchersModule,
    InfiniteScrollModule,
    TranslateModule,
    PerxBlackcombPagesModule
  ]
})
export class HistoryModule {}
