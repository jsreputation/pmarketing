import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuizModule as CoreQuizModule } from '@perxtech/core';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';

@NgModule({
  declarations: [QuizComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    CoreQuizModule
  ]
})
export class QuizModule { }
