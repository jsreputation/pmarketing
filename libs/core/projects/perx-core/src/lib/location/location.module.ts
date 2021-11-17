import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { LocationsMapComponent } from './locations-map/locations-map.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { V4LocationsService } from './v4-locations.service';
import { LocationsService } from './locations.service';
import { IMerchantsService } from '../merchants/imerchants.service';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';

const comps: any[] = [LocationsListComponent, LocationsMapComponent];

export function locationsServiceFactory(merchantsService: IMerchantsService, http: HttpClient, configService: ConfigService): LocationsService {
  // Make decision on what to instantiate base on config
  return new V4LocationsService(merchantsService, http, configService);
}

@NgModule({
  declarations: comps,
  imports: [
    CommonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: LocationsService,
      useFactory: locationsServiceFactory,
      deps: [IMerchantsService, HttpClient, ConfigService]
    }
  ],
  exports: comps
})
export class LocationModule {
}
