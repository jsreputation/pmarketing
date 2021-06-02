import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PointTransferComponent } from './point-transfer/point-transfer.component';
import { PointHistoryComponent } from './point-history/point-history.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [PointTransferComponent, PointHistoryComponent],
  exports: [PointTransferComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatCardModule,
    MatIconModule,
    RouterModule,
    InfiniteScrollModule
  ]
})
export class PointsModule { }
