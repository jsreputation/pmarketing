import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoyaltyListPageComponent } from 'src/app/loyalty/containers/loyalty-list-page/loyalty-list-page.component';
import { LoyaltyComponent } from 'src/app/loyalty/containers/loyalty/loyalty.component';

const routes: Routes = [
  {
    path: '',
    component: LoyaltyComponent,
    children: [
      {
        path: '',
        component: LoyaltyListPageComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltyRoutingModule {
}
