import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstantRewardOutcomeComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: InstantRewardOutcomeComponent
}];

@NgModule({
  imports: [
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes)
  ]
})
export class InstantRewardOutcomeModule { }
