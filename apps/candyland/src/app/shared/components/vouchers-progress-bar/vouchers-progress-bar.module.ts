import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VouchersProgressBarComponent } from '@cl-shared/components/vouchers-progress-bar/vouchers-progress-bar.component';
import { MatTooltipModule } from '@angular/material';

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
