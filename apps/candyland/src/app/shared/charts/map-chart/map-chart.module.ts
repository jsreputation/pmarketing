import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapChartComponent } from './map-chart.component';

@NgModule({
  declarations: [
    MapChartComponent
  ],
  exports: [
    MapChartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MapChartModule { }
