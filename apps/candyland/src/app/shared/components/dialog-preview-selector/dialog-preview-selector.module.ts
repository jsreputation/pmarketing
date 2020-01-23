import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogPreviewSelectorComponent} from '@cl-shared/components/dialog-preview-selector/dialog-preview-selector.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material';

@NgModule({
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {backdropClass: ['transparent-backdrop'], hasBackdrop: true}}
  ],
  declarations: [DialogPreviewSelectorComponent],
  exports: [DialogPreviewSelectorComponent],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  entryComponents: [
    DialogPreviewSelectorComponent
  ]
})
export class DialogPreviewSelectorModule { }
