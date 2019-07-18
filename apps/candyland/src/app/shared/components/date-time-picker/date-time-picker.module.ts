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
import { DateTimePickerComponent } from './date-time-picker.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    DateTimePickerComponent
  ],
  exports: [
    DateTimePickerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    NgxMaterialTimepickerModule
  ]
})
export class DateTimePickerModule {
  // constructor(private dateAdapter: DateAdapter<Date>) {
  //   dateAdapter.setLocale('en');
  // }
}
