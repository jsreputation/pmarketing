import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { V4StampService } from './v4-stamp.service';
import { StampService } from './stamp.service';
import { Config } from '../config/config';
import { IVoucherService } from '../vouchers/ivoucher.service';

export function stampServiceFactory(http: HttpClient, config: Config, vouchersService: IVoucherService): StampService {
  // Make decision on what to instantiate base on config
  if (config.isWhistler) {
    return new WhistlerStamp
    Service(http, config);
  }
  return new V4StampService(http, config, vouchersService);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: StampService,
      useFactory: stampServiceFactory,
      deps: [HttpClient, Config]
    }
  ]
})
export class StampModule {
}
