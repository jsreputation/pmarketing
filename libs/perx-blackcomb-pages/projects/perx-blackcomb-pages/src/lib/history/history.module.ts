import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VouchersModule } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HistoryComponent } from './history.component';

@NgModule({
  declarations: [HistoryComponent],
  exports: [HistoryComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    VouchersModule,
    InfiniteScrollModule,
  ]
})
export class HistoryModule { }
