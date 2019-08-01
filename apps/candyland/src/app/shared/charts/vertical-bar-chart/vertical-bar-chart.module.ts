import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalBarChartComponent } from './vertical-bar-chart.component';

@NgModule({
  declarations: [
    VerticalBarChartComponent
  ],
  exports: [
    VerticalBarChartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VerticalBarChartModule { }
