import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionFormFieldComponent } from './question-form-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OpenCloseDirective } from './open-close.directive';
import { QuestionTypeModule } from '@cl-shared/components/question-type/question-type.module';
import { MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';

@NgModule({
  declarations: [
    QuestionFormFieldComponent,
    OpenCloseDirective
  ],
  exports: [
    QuestionFormFieldComponent,
    OpenCloseDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuestionTypeModule,

    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
  ]
})
export class QuestionFormFieldModule { }
