import { CommonModule } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthenticationService,
  Config,
  ConfigModule,
  ConfigService,
  IRankService,
  PipeUtilsModule,
  PuzzlesModule,
  rankServiceFactory,
  SettingsService,
  StampModule,
  UtilsModule,
} from '@perxtech/core';
import { settingsServiceFactory } from 'libs/core/projects/perx-core/src/lib/settings/settings.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../shared/shared.module';
import { CampaignStampsComponent } from './campaign-stamps.component';
import { StampCardModule } from '../stamp/stamp-card/stamp-card.module';

const routes: Routes = [
  {
    path: '',
    component: CampaignStampsComponent,
  },
];

@NgModule({
  declarations: [CampaignStampsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    UtilsModule,
    InfiniteScrollModule,
    PuzzlesModule,
    RouterModule,
    StampModule,
    PipeUtilsModule,
    SharedModule,
    StampCardModule,
    ConfigModule.forChild(),
    RouterModule.forChild(routes),
  ],
  exports: [CampaignStampsComponent],
  providers: [
    {
      provide: IRankService,
      useFactory: rankServiceFactory,
      deps: [HttpClient, ConfigService],
    },
    {
      provide: SettingsService,
      useFactory: settingsServiceFactory,
      deps: [
        HttpClient,
        HttpBackend,
        Config,
        ConfigService,
        AuthenticationService,
      ],
    },
  ],
})
export class CampaignStampsModule {}
