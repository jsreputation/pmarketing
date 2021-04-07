import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { CommonModule } from '@angular/common';
import { QuizModule as PerxCoreQuizModule, UtilsModule } from '@perxtech/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

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
    UtilsModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class SHQuizModule { }
