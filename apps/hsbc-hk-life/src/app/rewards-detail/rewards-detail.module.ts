import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardDetailsComponent, PerxBlackcombPagesModule } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { RewardsModule } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: RewardDetailsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerxBlackcombPagesModule,
    RewardsModule,
    TranslateModule,
    MatButtonModule
  ]
})
export class RewardsDetailModule {}
