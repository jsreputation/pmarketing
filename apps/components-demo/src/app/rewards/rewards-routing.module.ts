import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RewardsComponent } from './rewards.component';
import { RewardsCarouselComponent } from './rewards-carousel/rewards-carousel.component';
import { RewardsListComponent } from './rewards-list/rewards-list.component';

const routes: Routes = [
  {
    path: '', component: RewardsComponent,
    children: [
      { path: 'carousel', component: RewardsCarouselComponent },
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
