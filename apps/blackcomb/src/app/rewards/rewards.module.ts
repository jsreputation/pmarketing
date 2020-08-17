import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RewardsPageComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: RewardsPageComponent
}];

@NgModule({
  imports: [
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes),
  ]
})
export class RewardsModule { }
