import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RewardComponent } from '@perx/blackcomb-pages';
const routes: Routes = [
  { path: '', pathMatch: 'full', component: RewardComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstantRewardRoutingModule { }
