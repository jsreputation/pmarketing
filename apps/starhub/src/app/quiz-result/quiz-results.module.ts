import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuizResultsComponent } from './quiz-results.component';
import { QuizModule } from '@perxtech/core';
import { MatCardModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: QuizResultsComponent }];

@NgModule({
  declarations: [QuizResultsComponent],
  exports: [QuizResultsComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes),
    QuizModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class SHQuizResultsModule { }
