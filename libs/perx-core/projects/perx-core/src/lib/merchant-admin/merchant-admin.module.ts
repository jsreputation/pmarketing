import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { WhistlerMerchantAdminService } from './whistler-merchant-admin.service';
import { V4MerchantAdminService } from './v4-merchant-admin.service';
import { IMerchantAdminService } from './imerchant-admin.service';

export function merchantAdminServiceFactory(http: HttpClient, config: Config): IMerchantAdminService {
  if (config.isWhistler) {
    return new WhistlerMerchantAdminService();
  }
  // Make decision on what to instantiate base on config
  return new V4MerchantAdminService(http, config);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: IMerchantAdminService,
      useFactory: merchantAdminServiceFactory,
      deps: [HttpClient, Config]
    }
  ]
})
export class MerchantAdminModule { }
