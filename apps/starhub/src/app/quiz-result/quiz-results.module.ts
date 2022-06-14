import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuizResultsComponent } from './quiz-results.component';
import { QuizModule, QuizServiceModule } from '@perxtech/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
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
    QuizServiceModule.forChild(),
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class SHQuizResultsModule { }
