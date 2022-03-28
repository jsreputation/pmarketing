import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteRewardsComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: FavoriteRewardsComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PerxBlackcombPagesModule
  ]
})
export class FavoriteRewardsModule { }
