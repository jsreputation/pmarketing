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
import {SepareteRangeDatePickerComponent} from './separate-range-date-picker.component';

@NgModule({
  declarations: [
    SepareteRangeDatePickerComponent
  ],
  exports: [
    SepareteRangeDatePickerComponent
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
export class SeparateRangeDatePickerModule {
}
