import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { CommonModule } from '@angular/common';
import { QuizModule as PerxCoreQuizModule, QuizServiceModule as PerxCoreQuizServiceModule, UtilsModule } from '@perxtech/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{
  path: '',
  component: QuizComponent,
  data: {
    allowPicZoom: true
  }
}];

@NgModule({
  declarations: [
    QuizComponent
  ],
  imports: [
    CommonModule,
    PerxCoreQuizModule,
    PerxCoreQuizServiceModule.forChild(),
    UtilsModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ]
})
export class SHQuizModule { }
