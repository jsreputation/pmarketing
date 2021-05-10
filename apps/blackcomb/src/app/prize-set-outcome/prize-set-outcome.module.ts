import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrizeSetOutcomeComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: PrizeSetOutcomeComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerxBlackcombPagesModule,
  ]
})
export class PrizeSetOutcomeModule { }
