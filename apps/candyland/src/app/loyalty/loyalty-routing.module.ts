import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoyaltyListPageComponent } from 'src/app/loyalty/containers/loyalty-list-page/loyalty-list-page.component';
import { LoyaltyComponent } from 'src/app/loyalty/containers/loyalty/loyalty.component';
import { ManageLoyaltyPageComponent } from './containers/manage-loyalty-page/manage-loyalty-page.component';
import { LoyaltyReviewPageComponent } from './containers/loyalty-review-page/loyalty-review-page.component';

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
        component: ManageLoyaltyPageComponent
      },
      {
        path: 'review/:id',
        component: LoyaltyReviewPageComponent
      },
      {
        path: 'edit/:id',
        component: ManageLoyaltyPageComponent
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
