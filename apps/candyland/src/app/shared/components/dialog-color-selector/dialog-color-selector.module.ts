import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogColorSelectorComponent} from '@cl-shared/components/dialog-color-selector/dialog-color-selector.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material';
import {ClColorPickerModule} from '@cl-shared/components/cl-color-picker/cl-color-picker.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {backdropClass: ['transparent-backdrop'], hasBackdrop: true}}
  ],
  declarations: [DialogColorSelectorComponent],
  exports: [DialogColorSelectorComponent],
  imports: [
    CommonModule,
    ClColorPickerModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents: [
    DialogColorSelectorComponent
  ]
})
export class DialogColorSelectorModule { }
