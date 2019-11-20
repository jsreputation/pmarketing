import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
} from '@angular/material';
import { TimePickerComponent } from './time-picker.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TimePickerComponent
  ],
  exports: [
    TimePickerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    NgxMaterialTimepickerModule,
    TranslateModule
  ]
})
export class TimePickerModule {
}
