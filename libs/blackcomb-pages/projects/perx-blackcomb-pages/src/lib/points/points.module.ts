import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PointHistoryComponent } from './point-history/point-history.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PointConversionComponent } from './point-transfer/point-conversion/point-conversion.component';
import { PointConversionConfirmationComponent } from './point-transfer/point-conversion-confirmation/point-conversion-confirmation.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PointHistoryComponent,
    PointConversionComponent,
    PointConversionConfirmationComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule,
    InfiniteScrollModule
  ]
})
export class PointsModule { }
