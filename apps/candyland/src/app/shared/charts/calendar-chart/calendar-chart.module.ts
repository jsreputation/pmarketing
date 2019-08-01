import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarChartComponent } from './calendar-chart.component';

@NgModule({
  declarations: [
    CalendarChartComponent
  ],
  exports: [
    CalendarChartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CalendarChartModule { }
