import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardPageComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: LeaderboardPageComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerxBlackcombPagesModule,
  ]
})
export class LeaderboardModule { }
