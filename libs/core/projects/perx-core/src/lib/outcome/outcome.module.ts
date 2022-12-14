import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { WhistlerInstantOutcomeService } from './whistler-instant-outcome.service';
import { V4InstantOutcomeService } from './v4-instant-outcome.service';
import { Config } from '../config/config';
import { InstantOutcomeService } from './instant-outcome.service';
import { IVoucherService } from '../vouchers/ivoucher.service';
import { ICampaignService } from '../campaign/icampaign.service';
import { ConfigService } from '../config/config.service';

export function instantRewardsSvcFactory(
  http: HttpClient,
  config: Config,
  configService: ConfigService,
  voucherService: IVoucherService,
  campaignService: ICampaignService
): InstantOutcomeService {
  // Make decision on what to instantiate base on config
  if (config.isWhistler) {
    return new WhistlerInstantOutcomeService(http, config, voucherService);
  }

  return new V4InstantOutcomeService(http, configService, campaignService);
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: InstantOutcomeService,
      useFactory: instantRewardsSvcFactory,
      deps: [HttpClient, Config, ConfigService, IVoucherService, ICampaignService]
    }
  ]
})
export class OutcomeModule {}
