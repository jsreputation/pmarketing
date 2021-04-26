import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import {
  AuthenticationService, CampaignServiceModule, Config, ConfigService,
  IRankService, rankServiceFactory, SettingsService, UtilsModule
} from '@perxtech/core';
import { ReferralComponent } from './referral.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { settingsServiceFactory } from 'libs/core/projects/perx-core/src/lib/settings/settings.module';

@NgModule({
  declarations: [ReferralComponent],
  exports: [ReferralComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatToolbarModule,
    MatButtonModule,
    UtilsModule,
    CampaignServiceModule.forChild(),
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
export class ReferralModule { }
