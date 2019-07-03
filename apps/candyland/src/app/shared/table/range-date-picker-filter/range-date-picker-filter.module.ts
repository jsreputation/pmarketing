import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeDatePickerFilterComponent } from './range-date-picker-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

@NgModule({
  declarations: [RangeDatePickerFilterComponent],
  exports: [RangeDatePickerFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class RangeDatePickerFilterModule {
}
