import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerxBlackcombPagesModule, QuizResultsComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [{ path: '', component: QuizResultsComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PerxBlackcombPagesModule,
    CommonModule,
  ]
})
export class QuizResultModule { }
