import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsModule, OutcomeModule, RewardComponent } from '@perxtech/core';
import { MatButtonModule } from '@angular/material';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: RewardComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RewardsModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    OutcomeModule,
    PerxBlackcombPagesModule
  ]
})
export class InstantRewardModule { }
