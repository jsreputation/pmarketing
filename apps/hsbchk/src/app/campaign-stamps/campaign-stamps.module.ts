import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignStampsComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PuzzlesModule } from '@perxtech/core';
const routes: Routes = [{
  path: '',
  component: CampaignStampsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes),
    InfiniteScrollModule,
    PuzzlesModule
  ],
  exports: [
    CampaignStampsComponent
  ]
})
export class CampaignStampsModule { }
