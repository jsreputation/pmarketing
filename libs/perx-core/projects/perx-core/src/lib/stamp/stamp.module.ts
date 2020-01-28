import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { V4StampService } from './v4-stamp.service';
import { StampService } from './stamp.service';
import { Config } from '../config/config';
import { IVoucherService } from '../vouchers/ivoucher.service';
import { WhistlerStampService } from './whistler-stamp.service';
import { ICampaignService } from '../campaign/icampaign.service';

export function stampServiceFactory(
  http: HttpClient,
  config: Config,
  vouchersService: IVoucherService,
  campaignService: ICampaignService
): StampService {
  // Make decision on what to instantiate base on config
  if (config.isWhistler) {
    return new WhistlerStampService(http, config);
  }
  return new V4StampService(http, config, vouchersService, campaignService);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: StampService,
      useFactory: stampServiceFactory,
      deps: [HttpClient, Config, IVoucherService, ICampaignService]
    }
  ]
})
export class StampModule {
}
