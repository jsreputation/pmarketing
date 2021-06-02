import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PointTransferComponent } from './point-transfer/point-transfer.component';
import { PointHistoryComponent } from './point-history/point-history.component';

@NgModule({
  declarations: [PointTransferComponent, PointHistoryComponent],
  exports: [PointTransferComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatCardModule,
    MatIconModule,
    RouterModule
  ]
})
export class PointsModule { }
