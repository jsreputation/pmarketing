import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoyaltyListPageComponent } from 'src/app/loyalty/containers/loyalty-list-page/loyalty-list-page.component';
import { LoyaltyComponent } from 'src/app/loyalty/containers/loyalty/loyalty.component';
import { NewLoyaltyComponent } from './containers/new-loyalty/new-loyalty.component';
import { LoyaltyReviewComponent } from './containers/loyalty-review/loyalty-review.component';

const routes: Routes = [
  {
    path: '',
    component: LoyaltyComponent,
    children: [
      {
        path: '',
        component: LoyaltyListPageComponent
      },
      {
        path: 'new',
        component: NewLoyaltyComponent
      },
      {
        path: 'review/:id',
        component: LoyaltyReviewComponent
      },
      {
        path: 'edit/:id',
        component: NewLoyaltyComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltyRoutingModule {
}
