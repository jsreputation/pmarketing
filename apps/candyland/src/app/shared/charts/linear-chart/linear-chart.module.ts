import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinearChartComponent } from './linear-chart.component';

@NgModule({
  declarations: [
    LinearChartComponent
  ],
  exports: [
    LinearChartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LinearChartModule { }
