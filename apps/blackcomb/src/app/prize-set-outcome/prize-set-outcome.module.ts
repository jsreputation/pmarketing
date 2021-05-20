import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrizeSetOutcomeComponent, PrizeSetOutcomeModule as BCPPrizeSetOutcomeModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: PrizeSetOutcomeComponent
}];

@NgModule({
  imports: [
    BCPPrizeSetOutcomeModule,
    RouterModule.forChild(routes)
  ]
})
export class PrizeSetOutcomeModule { }
