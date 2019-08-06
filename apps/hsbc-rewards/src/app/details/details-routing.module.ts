import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component';

const routes: Routes = [{
  path: '',
  component: DetailsComponent,
  children: [{
    path: ':id',
    loadChildren: () => import('./reward-detail/reward-detail.module').then(mod => mod.RewardDetailModule)
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
