import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CirclePieChartComponent } from './circle-pie-chart.component';

@NgModule({
  declarations: [
    CirclePieChartComponent
  ],
  exports: [
    CirclePieChartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CirclePieChartModule { }
