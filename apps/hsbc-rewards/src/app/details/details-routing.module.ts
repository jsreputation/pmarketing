import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component';

const routes: Routes = [{
  path: '',
  component: DetailsComponent,
  children: [{
    path: 'element/:id',
    loadChildren: () => import('./reward-detail/reward-detail.module').then(mod => mod.RewardDetailModule)
  }, {
    path: 'booking/:id',
    loadChildren: () => import('./redemption-booking/redemption-booking.module').then(mod => mod.RedemptionBookingModule)
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
