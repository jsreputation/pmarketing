import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule, PuzzlesModule, StampModule } from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CampaignStampsComponent } from './campaign-stamps.component';

@NgModule({
  declarations: [
    CampaignStampsComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    PuzzlesModule,
    RouterModule,
    StampModule,
    ConfigModule.forChild()
  ],
  exports: [
    CampaignStampsComponent
  ]
})
export class CampaignStampsModule { }
