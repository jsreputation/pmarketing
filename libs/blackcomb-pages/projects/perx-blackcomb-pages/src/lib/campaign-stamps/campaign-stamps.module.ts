import { CommonModule } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  UtilsModule
} from '@perxtech/core';
import { settingsServiceFactory } from 'libs/core/projects/perx-core/src/lib/settings/settings.module';
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
    ConfigModule.forChild(),
    PipeUtilsModule
  ],
  exports: [
    CampaignStampsComponent
  ],
  providers: [
    {
      provide: IRankService,
      useFactory: rankServiceFactory,
      deps: [HttpClient, ConfigService]
    },
    {
      provide: SettingsService,
      useFactory: settingsServiceFactory,
      deps: [HttpClient, HttpBackend, Config, ConfigService, AuthenticationService]
    }
  ]
})
export class CampaignStampsModule { }
