import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatOptionModule, MatSelectModule
} from '@angular/material';
import {
  SepareteRangeDatePickerFilterComponent
} from '@cl-shared/table/separate-range-date-picker-filter/separate-range-date-picker-filter.component';

@NgModule({
  declarations: [
    SepareteRangeDatePickerFilterComponent
  ],
  exports: [
    SepareteRangeDatePickerFilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class SeparateRangeDatePickerFilterModule {
}
