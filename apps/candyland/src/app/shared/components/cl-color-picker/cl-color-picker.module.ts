import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClColorPickerComponent } from './cl-color-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClColorPickerComponent],
  exports: [ClColorPickerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ColorPickerModule,
  ]
})
export class ClColorPickerModule { }
