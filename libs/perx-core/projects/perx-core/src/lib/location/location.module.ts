import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { LocationsMapComponent } from './locations-map/locations-map.component';
import { MatDividerModule, MatListModule, MatCardModule, MatIconModule } from '@angular/material';

const comps: any[] = [LocationsListComponent, LocationsMapComponent];
@NgModule({
  declarations: comps,
  imports: [
    CommonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCardModule
  ],
  exports: comps
})
export class LocationModule { }
