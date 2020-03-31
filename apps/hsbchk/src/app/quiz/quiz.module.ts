import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from '@perxtech/blackcomb-pages';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{ path: '', component: QuizComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class QuizModule { }
