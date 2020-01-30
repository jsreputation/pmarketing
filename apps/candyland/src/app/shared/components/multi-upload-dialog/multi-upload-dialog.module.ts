import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatIconModule} from '@angular/material';
import {MultiUploadDialogComponent} from '@cl-shared/components/multi-upload-dialog/multi-upload-dialog.component';
import {UploadGraphicModule} from '@cl-shared/components/upload-graphic/upload-graphic.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from '@perx/candyshop';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '@cl-shared/pipes/pipes.module';

@NgModule({
  declarations: [MultiUploadDialogComponent],
  exports: [MultiUploadDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    UploadGraphicModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
    ButtonModule,
    PipesModule
  ],
  entryComponents: [
    MultiUploadDialogComponent
  ]
})
export class MultiUploadDialogModule { }
