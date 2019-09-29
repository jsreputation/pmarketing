import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionPictureChoiceFieldComponent } from './question-picture-choice-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UploadGraphicModule } from '../../components/upload-graphic/upload-graphic.module';

@NgModule({
  declarations: [
    QuestionPictureChoiceFieldComponent,
    UploadImageComponent
  ],
  exports: [
    QuestionPictureChoiceFieldComponent
  ],
  entryComponents: [
    QuestionPictureChoiceFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    UploadGraphicModule
  ]
})
export class QuestionPictureChoiceFieldModule { }
