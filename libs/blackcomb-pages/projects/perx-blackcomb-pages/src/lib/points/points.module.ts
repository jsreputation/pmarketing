import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PointHistoryComponent } from './point-history/point-history.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PointConversionComponent } from './point-transfer/point-conversion/point-conversion.component';
import { PointConversionConfirmationComponent } from './point-transfer/point-conversion-confirmation/point-conversion-confirmation.component';

@NgModule({
  declarations: [
    PointHistoryComponent,
    PointConversionComponent,
    PointConversionConfirmationComponent],
  exports: [],
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
