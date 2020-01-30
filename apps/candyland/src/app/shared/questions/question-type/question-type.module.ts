import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatSelectModule } from '@angular/material';
import { ButtonModule } from '@perx/candyshop';
import { TranslateModule } from '@ngx-translate/core';
import { QuestionTypeComponent } from './question-type.component';

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
