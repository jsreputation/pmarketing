import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { LocationsMapComponent } from './locations-map/locations-map.component';
import { MatDividerModule, MatListModule, MatCardModule, MatIconModule } from '@angular/material';
import { V4LocationsService } from './v4-locations.service';
import { LocationsService } from './locations.service';
import { Config } from '../config/config';
import { HttpClient } from '@angular/common/http';

const comps: any[] = [LocationsListComponent, LocationsMapComponent];

export function locationsServiceFactory(http: HttpClient, config: Config): LocationsService {
  // Make decision on what to instantiate base on config
  return new V4LocationsService(http, config);
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
      deps: [HttpClient, Config]
    }
  ],
  exports: comps
})
export class LocationModule {
}
