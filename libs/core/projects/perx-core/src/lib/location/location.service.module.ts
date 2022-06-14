import { ModuleWithProviders, NgModule} from '@angular/core';
import { V4LocationsService } from './v4-locations.service';
import { LocationsService } from './locations.service';
import { IMerchantsService } from '../merchants/imerchants.service';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';

export function locationsServiceFactory(merchantsService: IMerchantsService, http: HttpClient, configService: ConfigService): LocationsService {
  // Make decision on what to instantiate base on config
  return new V4LocationsService(merchantsService, http, configService);
}

@NgModule({})
export class LocationServiceModule {
  public static forRoot(): ModuleWithProviders<LocationServiceModule> {
    return {
      ngModule: LocationServiceModule,
      providers: [
        {
          provide: LocationsService,
          useFactory: locationsServiceFactory,
          deps: [IMerchantsService, HttpClient, ConfigService]
        }
      ]
    };
  }
  public static forChild(): ModuleWithProviders<LocationServiceModule> {
    return {
      ngModule: LocationServiceModule
    };
  }
}
