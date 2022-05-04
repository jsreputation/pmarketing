import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  PerxBlackcombPagesModule,
  RewardVoucherDetailComponent,
} from '@perxtech/blackcomb-pages';

const routes: Routes = [
  { path: ':rewardId/:voucherId', pathMatch: 'full', component: RewardVoucherDetailComponent },
  { path: ':rewardId', pathMatch: 'full', component: RewardVoucherDetailComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerxBlackcombPagesModule,
  ]
})
export class RewardVoucherDetailModule { }
