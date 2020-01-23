import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material';
import {MultiUploadDialogComponent} from '@cl-shared/components/multi-upload-dialog/multi-upload-dialog.component';

@NgModule({
  declarations: [MultiUploadDialogComponent],
  exports: [MultiUploadDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  entryComponents: [
    MultiUploadDialogComponent
  ]
})
export class MultiUploadDialogModule { }
