import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerModule as NgxColorPickerModule  } from 'ngx-color-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ColorPickerComponent],
  exports: [ColorPickerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxColorPickerModule,
    MatInputModule
  ]
})
export class ColorPickerModule { }
