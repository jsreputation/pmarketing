import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatProgressBarModule, MatToolbarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { QuizModule as PerxCoreQuizModule, UtilsModule } from '@perxtech/core';
import { QuizComponent } from './quiz.component';

@NgModule({
  declarations: [QuizComponent],
  exports: [QuizComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    PerxCoreQuizModule,
    UtilsModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: []
})
export class QuizModule { }
