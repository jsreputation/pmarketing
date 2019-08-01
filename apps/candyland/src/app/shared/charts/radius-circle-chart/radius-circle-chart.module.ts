import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadiusCircleChartComponent } from './radius-circle-chart.component';

@NgModule({
  declarations: [
    RadiusCircleChartComponent
  ],
  exports: [
    RadiusCircleChartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RadiusCircleChartModule { }
