import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RewardsBookingComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: RewardsBookingComponent
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
