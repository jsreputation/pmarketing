import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerxChartModule } from '@perx/chart';
import { ChartCardComponent } from './chart-card.component';

@NgModule({
  declarations: [
    ChartCardComponent
  ],
  exports: [
    ChartCardComponent
  ],
  imports: [
    CommonModule,
    PerxChartModule
  ]
})
export class ChartCardModule { }
