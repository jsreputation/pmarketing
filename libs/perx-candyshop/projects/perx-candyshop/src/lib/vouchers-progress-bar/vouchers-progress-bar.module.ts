import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material';
import { VouchersProgressBarComponent } from './vouchers-progress-bar.component';

@NgModule({
  declarations: [VouchersProgressBarComponent],
  exports: [VouchersProgressBarComponent],
  imports: [
    CommonModule,
    MatTooltipModule
  ]
})
export class VouchersProgressBarModule {
}
