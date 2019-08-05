import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RewardsComponent } from './rewards.component';
import { RewardsCollectionComponent } from './rewards-collection/rewards-collection.component';
import { RewardsListComponent } from './rewards-list/rewards-list.component';
import { RewardComponent } from './reward/reward.component';
import { RewardsListTabbedComponent } from './rewards-list/rewards-list-tabbed/rewards-list-tabbed.component';

const routes: Routes = [
  {
    path: '', component: RewardsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'collection'},
      { path: 'collection', component: RewardsCollectionComponent },
      { path: 'list', component: RewardsListComponent },
      { path: 'list-tabbed', component: RewardsListTabbedComponent},
      { path: 'detail', component: RewardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardsRoutingModule {
}
