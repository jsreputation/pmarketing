import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { CampaignServiceModule, ConfigService, IRankService, rankServiceFactory, UtilsModule } from '@perxtech/core';
import { ReferralComponent } from './referral.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

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
    }
  ]
})
export class ReferralModule { }
