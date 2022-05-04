import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerxBlackcombPagesModule, RewardsBookingComponent } from '@perxtech/blackcomb-pages';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: RewardsBookingComponent,
    data: {
      chooseQuantity: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes)
  ]
})
export class RewardsBookingModule { }
