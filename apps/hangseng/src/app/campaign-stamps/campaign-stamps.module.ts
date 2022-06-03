import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignStampsModule as BCPCampaignStampsModule } from '@perxtech/blackcomb-pages';
import { ConfigModule, PipeUtilsModule, PuzzlesModule, StampModule, UtilsModule } from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CampaignStampsComponent } from './campaign-stamps.component';

const routes: Routes = [{
  path: '',
  component: CampaignStampsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    InfiniteScrollModule,
    PipeUtilsModule,
    StampModule,
    PuzzlesModule,
    BCPCampaignStampsModule,
    ConfigModule,
    RouterModule.forChild(routes),
  ]
})
export class CampaignStampsModule { }
