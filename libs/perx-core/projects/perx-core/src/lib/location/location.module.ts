import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { LocationsMapComponent } from './locations-map/locations-map.component';
import { MatDividerModule, MatListModule, MatCardModule, MatIconModule } from '@angular/material';
import { V4LocationsService } from './v4-locations.service';
import { LocationsService } from './locations.service';
import { IMerchantsService } from '../merchants/imerchants.service';
import { TranslateModule } from '@ngx-translate/core';

const comps: any[] = [LocationsListComponent, LocationsMapComponent];

export function locationsServiceFactory(merchantsService: IMerchantsService): LocationsService {
  // Make decision on what to instantiate base on config
  return new V4LocationsService(merchantsService);
}

@NgModule({
  declarations: comps,
  imports: [
    CommonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    TranslateModule.forChild()
  ],
  providers: [
    {
      provide: LocationsService,
      useFactory: locationsServiceFactory,
      deps: [IMerchantsService]
    }
  ],
  exports: comps
})
export class LocationModule {
}
