import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { CommonModule } from '@angular/common';
import { QuizModule as PerxCoreQuizModule, UtilsModule } from '@perxtech/core';
import { MatButtonModule, MatCardModule, MatProgressBarModule, MatToolbarModule } from '@angular/material';

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
