import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { WhistlerMerchantsService } from './whistler-merchants.service';
import { V4MerchantsService } from './v4-merchants.service';
import { IMerchantsService } from './imerchants.service';
import { ConfigService } from '../config/config.service';

export function merchantsServiceFactory(http: HttpClient, config: Config, configService: ConfigService): IMerchantsService {
  if (config.isWhistler) {
    return new WhistlerMerchantsService(http, config);
  }
  // Make decision on what to instantiate base on config
  return new V4MerchantsService(http, configService);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: IMerchantsService,
      useFactory: merchantsServiceFactory,
      deps: [HttpClient, Config, ConfigService]
    }
  ]
})
export class MerchantsModule { }
