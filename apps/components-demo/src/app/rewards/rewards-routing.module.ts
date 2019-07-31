import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RewardsComponent } from './rewards.component';
import { RewardsCollectionComponent } from './rewards-collection/rewards-collection.component';
import { RewardsListComponent } from './rewards-list/rewards-list.component';

const routes: Routes = [
  {
    path: '', component: RewardsComponent,
    children: [
      { path: 'collection', component: RewardsCollectionComponent },
      { path: 'list', component: RewardsListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardsRoutingModule {
}
