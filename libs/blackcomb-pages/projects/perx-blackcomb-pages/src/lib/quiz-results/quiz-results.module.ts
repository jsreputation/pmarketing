import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuizResultsComponent } from './quiz-results.component';
import { QuizModule } from '@perxtech/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
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
