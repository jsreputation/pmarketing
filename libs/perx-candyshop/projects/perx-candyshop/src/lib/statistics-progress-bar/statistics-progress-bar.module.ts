import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material';
import { StatisticsProgressBarComponent } from './statistics-progress-bar.component';

@NgModule({
  declarations: [StatisticsProgressBarComponent],
  exports: [StatisticsProgressBarComponent],
  imports: [
    CommonModule,
    MatTooltipModule
  ]
})
export class StatisticsProgressBarModule {
}
