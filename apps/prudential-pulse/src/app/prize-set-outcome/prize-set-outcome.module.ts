import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrizeSetOutcomeComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: PrizeSetOutcomeComponent
}];

@NgModule({
  imports: [
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes)
  ]
})
export class PrizeSetOutcomeModule { }
