import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule, ConfigService, IRankService, PuzzlesModule, rankServiceFactory, StampModule, UtilsModule } from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CampaignStampsComponent } from './campaign-stamps.component';

@NgModule({
  declarations: [
    CampaignStampsComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    InfiniteScrollModule,
    PuzzlesModule,
    RouterModule,
    StampModule,
    ConfigModule.forChild()
  ],
  exports: [
    CampaignStampsComponent
  ],
  providers: [
    {
      provide: IRankService,
      useFactory: rankServiceFactory,
      deps: [HttpClient, ConfigService]
    }
  ]
})
export class CampaignStampsModule { }
