import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { WhistlerInstantOutcomeService } from './whistler-instant-outcome.service';
import { V4InstantOutcomeService } from './v4-instant-outcome.service';
import { Config } from '../config/config';
import { InstantOutcomeService } from './instant-outcome.service';
import { IVoucherService } from '../vouchers/ivoucher.service';

export function instantRewardsSvcFactory(http: HttpClient, config: Config, voucherService: IVoucherService): InstantOutcomeService {
  // Make decision on what to instantiate base on config
  if (config.isWhistler) {
    return new WhistlerInstantOutcomeService(http, config, voucherService);
  }

  return new V4InstantOutcomeService(http, config);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: InstantOutcomeService,
      useFactory: instantRewardsSvcFactory,
      deps: [HttpClient, Config, IVoucherService]
    }
  ]
})
export class OutcomeModule { }
