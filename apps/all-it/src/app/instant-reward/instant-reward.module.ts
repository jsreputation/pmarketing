import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { PerxBlackcombPagesModule, RewardComponent } from '@perxtech/blackcomb-pages';
import { OutcomeModule, RewardsModule } from '@perxtech/core';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: RewardComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  declarations: [RewardComponent],
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
