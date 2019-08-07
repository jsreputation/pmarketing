import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { LocationsMapComponent } from './locations-map/locations-map.component';
import { MatDividerModule, MatListModule, MatCardModule, MatIconModule } from '@angular/material';
import { V4LocationsService } from './v4-locations.service';
import { LocationsService } from './locations.service';
import { EnvConfig } from '../shared/env-config';

const comps: any[] = [LocationsListComponent, LocationsMapComponent];
@NgModule({
  declarations: comps,
  imports: [
    CommonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: comps
})
export class LocationModule {
  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: LocationModule,
      providers: [
        {
          provide: EnvConfig,
          useValue: config
        },
        {
          provide: LocationsService,
          useClass: V4LocationsService
        }
      ],
    };
  }
}
