import { NgModule } from '@angular/core';
import { RedemptionBookingComponent } from './redemption-booking.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: RedemptionBookingComponent
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedemptionBookingRoutingModule { }
