import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeDatePickerComponent } from './range-date-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

@NgModule({
  declarations: [RangeDatePickerComponent],
  exports: [RangeDatePickerComponent],
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
export class RangeDatePickerModule {
}
