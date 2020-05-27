import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuizResultsComponent } from './quiz-results.component';
import { QuizModule } from '@perxtech/core';
import { MatCardModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [QuizResultsComponent],
  exports: [QuizResultsComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
    QuizModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class QuizResultsModule { }
