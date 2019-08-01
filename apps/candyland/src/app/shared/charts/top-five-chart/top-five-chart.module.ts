import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopFiveChartComponent } from './top-five-chart.component';

@NgModule({
  declarations: [
    TopFiveChartComponent
  ],
  exports: [
    TopFiveChartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TopFiveChartModule { }
