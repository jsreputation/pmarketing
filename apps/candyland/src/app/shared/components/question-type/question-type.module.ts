import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionTypeComponent } from './question-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatSelectModule } from '@angular/material';
import { ButtonModule } from '@cl-shared/components/button/button.module';

@NgModule({
  declarations: [
    QuestionTypeComponent
  ],
  exports: [
    QuestionTypeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,

    MatSelectModule,
    MatIconModule,
  ]
})
export class QuestionTypeModule { }
