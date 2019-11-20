import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionTypeComponent } from 'src/app/shared/questions/question-type/question-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatSelectModule } from '@angular/material';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule,
  ]
})
export class QuestionTypeModule { }
